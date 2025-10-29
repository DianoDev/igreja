<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ArquivoController extends Controller
{
    /**
     * Download/visualização de arquivo
     *
     * Rota: /storage/public/uploads/{ano}/{mes}/{dia}/{hash}
     * Exemplo: /storage/public/uploads/2024/10/29/abc123-uuid.jpg
     */
    public function download(string $ano, string $mes, string $dia, string $hash): BinaryFileResponse
    {
        // 1. Validar formato dos parâmetros (segurança básica)
        if (!preg_match('/^\d{4}$/', $ano)) {
            abort(400, 'Ano inválido');
        }

        if (!preg_match('/^\d{2}$/', $mes)) {
            abort(400, 'Mês inválido');
        }

        if (!preg_match('/^\d{2}$/', $dia)) {
            abort(400, 'Dia inválido');
        }

        // 2. Validar extensão do arquivo (apenas imagens para galeria)
        $extensao = pathinfo($hash, PATHINFO_EXTENSION);
        $extensoesPermitidas = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'doc', 'docx'];

        if (!in_array(strtolower($extensao), $extensoesPermitidas)) {
            abort(403, 'Tipo de arquivo não permitido');
        }

        // 3. Prevenir path traversal (segurança crítica)
        if (strpos($hash, '..') !== false || strpos($hash, '/') !== false || strpos($hash, '\\') !== false) {
            abort(403, 'Acesso negado');
        }

        // 4. Construir caminho do arquivo
        $caminho = storage_path("app/public/uploads/{$ano}/{$mes}/{$dia}/{$hash}");

        // 5. Verificar se arquivo existe
        if (!file_exists($caminho)) {
            abort(404, 'Arquivo não encontrado');
        }

        // 6. Verificar se é realmente um arquivo (não um diretório)
        if (!is_file($caminho)) {
            abort(403, 'Acesso negado');
        }

        // 7. Retornar arquivo
        // response()->file() - Exibe no browser (imagens, PDFs)
        return response()->file($caminho);

        // OU para forçar download:
        // return response()->download($caminho, $hash);
    }

    /**
     * ALTERNATIVA: Método mais completo com logging e validação no banco
     */
    public function downloadSeguro(string $ano, string $mes, string $dia, string $hash): BinaryFileResponse
    {
        // 1. Validar parâmetros
        $this->validarParametros($ano, $mes, $dia, $hash);

        // 2. Construir hash completo
        $hashCompleto = "public/uploads/{$ano}/{$mes}/{$dia}/{$hash}";

        // 3. Verificar se arquivo existe no banco de dados (opcional mas recomendado)
        $arquivo = \App\Databases\Models\Arquivo::where('hash', $hashCompleto)
            ->whereNull('deleted_at')
            ->first();

        if (!$arquivo) {
            abort(404, 'Arquivo não encontrado no sistema');
        }

        // 4. Construir caminho físico
        $caminho = storage_path("app/{$hashCompleto}");

        // 5. Verificar se arquivo físico existe
        if (!file_exists($caminho) || !is_file($caminho)) {
            // Log do erro
            \Log::error("Arquivo não encontrado fisicamente", [
                'hash' => $hashCompleto,
                'caminho' => $caminho
            ]);
            abort(404, 'Arquivo não encontrado no servidor');
        }

        // 6. Log de acesso (opcional)
        \Log::info("Arquivo acessado", [
            'arquivo_id' => $arquivo->id,
            'hash' => $hashCompleto,
            'ip' => request()->ip()
        ]);

        // 7. Retornar arquivo com headers apropriados
        return response()->file($caminho, [
            'Content-Type' => $arquivo->content_type,
            'Content-Disposition' => 'inline; filename="' . $arquivo->nome . '"',
        ]);
    }

    /**
     * Validar parâmetros da URL
     */
    private function validarParametros(string $ano, string $mes, string $dia, string $hash): void
    {
        // Validar ano (1900-2100)
        if (!preg_match('/^(19|20)\d{2}$/', $ano)) {
            abort(400, 'Ano inválido');
        }

        // Validar mês (01-12)
        if (!preg_match('/^(0[1-9]|1[0-2])$/', $mes)) {
            abort(400, 'Mês inválido');
        }

        // Validar dia (01-31)
        if (!preg_match('/^(0[1-9]|[12][0-9]|3[01])$/', $dia)) {
            abort(400, 'Dia inválido');
        }

        // Validar hash (UUID + extensão)
        // Exemplo: abc12345-6789-1234-5678-123456789abc.jpg
        if (!preg_match('/^[a-f0-9\-]+\.[a-z0-9]+$/i', $hash)) {
            abort(400, 'Hash inválido');
        }

        // Prevenir path traversal
        if (strpos($hash, '..') !== false ||
            strpos($hash, '/') !== false ||
            strpos($hash, '\\') !== false) {
            abort(403, 'Acesso negado - caracteres inválidos');
        }

        // Validar extensão
        $extensao = pathinfo($hash, PATHINFO_EXTENSION);
        $extensoesPermitidas = [
            // Imagens
            'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg',
            // Documentos
            'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx',
            // Outros
            'txt', 'csv', 'zip'
        ];

        if (!in_array(strtolower($extensao), $extensoesPermitidas)) {
            abort(403, 'Tipo de arquivo não permitido');
        }
    }
}
