<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Databases\Models\Arquivo;
use App\Databases\Models\Eventos;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Exception;

class GaleriaEventoController extends Controller
{
    /**
     * Renderiza a página da galeria (Inertia)
     */
    public function index(int $idEvento): Response
    {
        $evento = Eventos::findOrFail($idEvento);

        return Inertia::render('Admin/Eventos/GaleriaEvento', [
            'idEvento' => $idEvento,
            'evento' => $evento
        ]);
    }

    /**
     * Lista todas as fotos de um evento (API JSON)
     */
    public function listar(int $idEvento): JsonResponse
    {
        $evento = Eventos::findOrFail($idEvento);

        $fotos = Arquivo::where('tabela', 'eventos')
            ->where('chave', $idEvento)
            ->whereNull('deleted_at')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'evento' => $evento,
            'fotos' => $fotos
        ]);
    }

    /**
     * Upload de múltiplas fotos
     */
    public function upload(Request $request, int $idEvento): JsonResponse
    {
        $request->validate([
            'fotos' => 'required|array|max:20',
            'fotos.*' => 'required|image|mimes:jpeg,jpg,png,gif,webp|max:10240', // 10MB
        ], [
            'fotos.required' => 'Selecione pelo menos uma foto',
            'fotos.max' => 'Você pode enviar no máximo 20 fotos por vez',
            'fotos.*.image' => 'O arquivo deve ser uma imagem',
            'fotos.*.mimes' => 'Formato aceito: JPG, PNG, GIF, WEBP',
            'fotos.*.max' => 'Cada foto deve ter no máximo 10MB',
        ]);

        $evento = Eventos::findOrFail($idEvento);

        DB::beginTransaction();
        try {
            $fotosUpload = [];

            foreach ($request->file('fotos') as $foto) {
                $hash = Str::uuid();
                $name = $foto->getClientOriginalName();
                $mime = $foto->getClientMimeType();
                $size = $foto->getSize();
                $extension = $foto->getClientOriginalExtension();

                // Caminho dentro do storage/app/public
                $destino = sprintf("uploads/%s", date("Y/m/d"));
                $filename = sprintf("%s.%s", $hash, strtolower($extension));

                // CORREÇÃO: Especificar explicitamente o disco 'public'
                $foto->storeAs($destino, $filename, 'public');

                $arquivo = new Arquivo([
                    'tabela' => 'eventos',
                    'chave' => $idEvento,
                    'titulo' => $name,
                    'nome' => $name,
                    'tamanho' => $size,
                    'content_type' => $mime,
                    // Hash salvo com 'public/' para manter compatibilidade
                    'hash' => "public/{$destino}/{$filename}",
                ]);
                $arquivo->save();

                $fotosUpload[] = $arquivo;
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => count($fotosUpload) . ' foto(s) enviada(s) com sucesso!',
                'fotos' => $fotosUpload
            ]);

        } catch (Exception $ex) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Erro ao fazer upload das fotos: ' . $ex->getMessage()
            ], 500);
        }
    }

    /**
     * Excluir uma foto
     */
    public function excluir(int $idEvento, int $idFoto): JsonResponse
    {
        DB::beginTransaction();
        try {
            $foto = Arquivo::where('id', $idFoto)
                ->where('tabela', 'eventos')
                ->where('chave', $idEvento)
                ->whereNull('deleted_at')
                ->firstOrFail();

            // Excluir arquivo físico do storage
            if ($foto->hash) {
                Storage::disk('public')->delete(str_replace('public/', '', $foto->hash));
            }

            $foto->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Foto excluída com sucesso!'
            ]);

        } catch (Exception $ex) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Erro ao excluir foto: ' . $ex->getMessage()
            ], 500);
        }
    }

    /**
     * Atualizar título/descrição de uma foto
     */
    public function atualizar(Request $request, int $idEvento, int $idFoto): JsonResponse
    {
        $request->validate([
            'titulo' => 'nullable|string|max:255',
            'descricao' => 'nullable|string|max:1000',
        ]);

        DB::beginTransaction();
        try {
            $foto = Arquivo::where('id', $idFoto)
                ->where('tabela', 'eventos')
                ->where('chave', $idEvento)
                ->whereNull('deleted_at')
                ->firstOrFail();

            $foto->update([
                'titulo' => $request->titulo ?? $foto->nome,
                'descricao' => $request->descricao
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Foto atualizada com sucesso!',
                'foto' => $foto
            ]);

        } catch (Exception $ex) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Erro ao atualizar foto: ' . $ex->getMessage()
            ], 500);
        }
    }

    /**
     * Excluir múltiplas fotos de uma vez
     */
    public function excluirMultiplas(Request $request, int $idEvento): JsonResponse
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer',
        ]);

        DB::beginTransaction();
        try {
            $fotos = Arquivo::where('tabela', 'eventos')
                ->where('chave', $idEvento)
                ->whereIn('id', $request->ids)
                ->whereNull('deleted_at')
                ->get();

            foreach ($fotos as $foto) {
                // Excluir arquivo físico do storage
                if ($foto->hash) {
                    Storage::disk('public')->delete(str_replace('public/', '', $foto->hash));
                }
                $foto->delete();
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => count($fotos) . ' foto(s) excluída(s) com sucesso!'
            ]);

        } catch (Exception $ex) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Erro ao excluir fotos: ' . $ex->getMessage()
            ], 500);
        }
    }
}
