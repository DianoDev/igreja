<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório do Evento - {{ $evento->nome }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            font-size: 13px;
            line-height: 1.6;
            color: #1a202c;
            padding: 20px;
            background: #ffffff;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #cbd5e0;
        }

        .header h1 {
            font-size: 26px;
            color: #1a202c;
            margin-bottom: 12px;
            font-weight: 700;
            letter-spacing: -0.5px;
        }

        .header .info {
            font-size: 14px;
            color: #4a5568;
            margin-top: 8px;
            font-weight: 500;
        }

        .section {
            margin-bottom: 30px;
        }

        .section-title {
            font-size: 16px;
            font-weight: 700;
            color: #1a202c;
            margin-bottom: 16px;
            padding: 12px 0;
            border-bottom: 2px solid #cbd5e0;
            text-transform: uppercase;
            letter-spacing: 0.8px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            background: white;
        }

        table thead {
            background-color: #f7fafc;
        }

        table th {
            padding: 12px 10px;
            text-align: left;
            font-weight: 700;
            font-size: 12px;
            color: #2d3748;
            border-bottom: 2px solid #cbd5e0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        table td {
            padding: 11px 10px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 13px;
            color: #2d3748;
            line-height: 1.5;
        }

        table tbody tr:hover {
            background-color: #fafafa;
        }

        .resumo-financeiro {
            display: table;
            width: 100%;
            margin-bottom: 30px;
            border: 2px solid #cbd5e0;
        }

        .resumo-item {
            display: table-cell;
            width: 33.33%;
            padding: 20px;
            text-align: center;
            border-right: 2px solid #e2e8f0;
        }

        .resumo-item:last-child {
            border-right: none;
        }

        .resumo-label {
            font-size: 11px;
            color: #718096;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            margin-bottom: 8px;
        }

        .resumo-valor {
            font-size: 22px;
            font-weight: 700;
            color: #1a202c;
            margin-top: 6px;
            line-height: 1.3;
        }

        .resumo-valor.negativo {
            color: #c53030;
        }

        .resumo-valor.positivo {
            color: #2f855a;
        }

        .resumo-valor.alerta {
            color: #b7791f;
        }

        .info-box {
            background: #f7fafc;
            border: 2px solid #cbd5e0;
            border-left: 4px solid #4a5568;
            padding: 14px 16px;
            margin-bottom: 18px;
            font-size: 13px;
            line-height: 1.7;
        }

        .info-box strong {
            color: #1a202c;
            font-size: 14px;
            font-weight: 700;
        }

        .destaque-row {
            background-color: #f7fafc !important;
            font-weight: 700;
        }

        .text-right {
            text-align: right;
        }

        .text-center {
            text-align: center;
        }

        .sem-dados {
            text-align: center;
            padding: 30px;
            color: #718096;
            font-style: italic;
            font-size: 13px;
        }

        .footer {
            margin-top: 40px;
            padding-top: 15px;
            border-top: 2px solid #cbd5e0;
            text-align: center;
            font-size: 11px;
            color: #718096;
        }

        .subsection-title {
            font-size: 14px;
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 12px;
            margin-top: 18px;
        }

        .total-row {
            font-weight: 700;
            background-color: #edf2f7 !important;
            font-size: 14px;
        }

        .separator {
            height: 2px;
            background: #cbd5e0;
            margin: 25px 0;
        }

        .badge {
            display: inline-block;
            padding: 5px 12px;
            font-size: 11px;
            font-weight: 700;
            border-radius: 4px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .badge-gray {
            background: #edf2f7;
            color: #2d3748;
        }

        .badge-red {
            background: #fff5f5;
            color: #c53030;
        }

        .badge-green {
            background: #f0fff4;
            color: #2f855a;
        }

        /* Melhor contraste para textos importantes */
        .valor-destaque {
            font-weight: 700;
            font-size: 14px;
            color: #1a202c;
        }

        /* Aumentar espaçamento entre linhas das tabelas */
        tbody tr {
            line-height: 1.6;
        }

        /* Negrito em valores monetários */
        .valor-monetario {
            font-weight: 700;
            color: #1a202c;
        }
    </style>
</head>
<body>
<!-- CABEÇALHO -->
<div class="header">
    <h1>{{ $evento->nome }}</h1>
    <div class="info">
        <strong>Data:</strong> {{ \Carbon\Carbon::parse($evento->data)->format('d/m/Y') }}
        &nbsp;&nbsp;•&nbsp;&nbsp;
        <strong>Horário:</strong> {{ $evento->hora }}
    </div>
    <div class="info" style="margin-top: 10px;">
        Relatório gerado em {{ now()->format('d/m/Y \à\s H:i') }}
    </div>
</div>

<!-- RESUMO FINANCEIRO -->
<div class="resumo-financeiro">
    <div class="resumo-item">
        <div class="resumo-label">Valor de Gasto Previsto</div>
        <div class="resumo-valor negativo">R$ {{ number_format($evento->valor_gasto, 2, ',', '.') }}</div>
    </div>
    <div class="resumo-item">
        <div class="resumo-label">Valor Arrecadado</div>
        <div class="resumo-valor positivo">R$ {{ number_format($evento->valor_arrecadado, 2, ',', '.') }}</div>
    </div>
    <div class="resumo-item">
        <div class="resumo-label">Saldo</div>
        <div class="resumo-valor {{ $saldo > 0 ? 'positivo' : ($saldo < 0 ? 'alerta' : '') }}">
            R$ {{ number_format($saldo, 2, ',', '.') }}
        </div>
    </div>
</div>
<!-- CARDÁPIO -->
@if($evento->cardapios && $evento->cardapios->count() > 0)
    <div class="section">
        <div class="section-title">Prestação de Contas do Evento</div>

        @foreach($evento->cardapios as $cardapio)
            <div style="margin-bottom: 25px;">
                <div class="info-box">
                    <strong style="font-size: 15px;">{{ $cardapio->nome }}</strong>
                    @if($cardapio->descricao)
                        <br><span style="color: #4a5568; font-size: 13px;">{{ $cardapio->descricao }}</span>
                    @endif
                </div>

                @if($cardapio->ingredientes && $cardapio->ingredientes->count() > 0)
                    <table>
                        <thead>
                        <tr>
                            <th style="width: 28%;">Ingrediente</th>
                            <th style="width: 28%;">Responsável</th>
                            <th style="width: 16%;">Quantidade</th>
                            <th style="width: 14%;" class="text-right">Valor Unit.</th>
                            <th style="width: 14%;" class="text-right">Valor Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($cardapio->ingredientes as $ingrediente)
                            <tr>
                                <td style="font-weight: 600;">{{ $ingrediente->nome }}</td>
                                <td style="{{ !$ingrediente->pessoa ? 'color: #c53030; font-style: italic; font-weight: 600;' : 'font-weight: 500;' }}">
                                    {{ $ingrediente->pessoa ? $ingrediente->pessoa->nome : 'Sem responsável' }}
                                </td>
                                <td style="font-weight: 500;">{{ $ingrediente->quantidade }} {{ $ingrediente->unidade_medida }}</td>
                                <td class="text-right valor-monetario">
                                    R$ {{ number_format($ingrediente->valor_unitario, 2, ',', '.') }}</td>
                                <td class="text-right valor-destaque">
                                    R$ {{ number_format($ingrediente->valor_total, 2, ',', '.') }}</td>
                            </tr>
                        @endforeach
                        <tr class="total-row">
                            <td colspan="4" class="text-right">SUBTOTAL</td>
                            <td class="text-right">
                                R$ {{ number_format($cardapio->ingredientes->sum('valor_total'), 2, ',', '.') }}</td>
                        </tr>
                        </tbody>
                    </table>
                @else
                    <div class="sem-dados">Nenhum ingrediente cadastrado</div>
                @endif
            </div>
        @endforeach
        <div class="info-box" style="border-left-color: #c53030; background: #fff5f5;">
            <strong style="font-size: 15px; color: #c53030;">
                Total a Pagar (Sem Responsável): R$ {{ number_format($valor_a_pagar, 2, ',', '.') }}
            </strong>
        </div>
    </div>
@endif

<!-- DOAÇÕES -->
<div class="section">
    <div class="section-title">Doações Recebidas</div>

    @if($evento->doacoes && $evento->doacoes->count() > 0)
        <table>
            <thead>
            <tr>
                <th style="width: 65%;">Doador</th>
                <th style="width: 35%;" class="text-right">Valor Doado</th>
            </tr>
            </thead>
            <tbody>
            @foreach($evento->doacoes as $doacao)
                <tr>
                    <td style="font-weight: 600;">{{ $doacao->pessoa->nome }}</td>
                    <td class="text-right valor-destaque">
                        R$ {{ number_format($doacao->valor, 2, ',', '.') }}
                    </td>
                </tr>
            @endforeach
            <tr class="total-row">
                <td class="text-right">TOTAL</td>
                <td class="text-right">R$ {{ number_format($evento->doacoes->sum('valor'), 2, ',', '.') }}</td>
            </tr>
            </tbody>
        </table>
    @else
        <div class="sem-dados">Nenhuma doação registrada para este evento</div>
    @endif
</div>
<!-- INFORMAÇÕES DA COMISSÃO -->
@if($comissao)
    <div class="section">
        <div class="section-title">Comissão do Evento</div>

        <div class="info-box">
            <strong>{{ $comissao->nome }}</strong> - Ano {{ $comissao->ano }}
            @if($comissao->descricao)
                <br><span style="color: #4a5568; font-size: 13px;">{{ $comissao->descricao }}</span>
            @endif
        </div>

        <!-- PÁROCO -->
        <div class="info-box" style="border-left-color: #2d3748;">
            <strong>Pároco:</strong> Pe. Pedro Canísio Schroeder sj
        </div>

        <!-- INTEGRANTES DA COMISSÃO -->
        @php
            $integrantesComissao = $comissao->integrantes->filter(function($i) {
                return $i->cargo->nome !== 'Festeiro de Promessa';
            });
        @endphp

        @if($integrantesComissao->count() > 0)
            <div style="margin-top: 20px;">
                <div class="subsection-title">Integrantes da Comissão</div>
                <table>
                    <thead>
                    <tr>
                        <th style="width: 60%;">Nome</th>
                        <th style="width: 40%;">Cargo</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($integrantesComissao as $integrante)
                        <tr>
                            <td style="font-weight: 600;">{{ $integrante->pessoa->nome }}</td>
                            <td>{{ $integrante->cargo->nome }}</td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        @endif

        <!-- FESTEIROS DE PROMESSA -->
        @php
            $festeiros = $comissao->integrantes->filter(function($i) {
                return $i->cargo->nome === 'Festeiro de Promessa';
            });
        @endphp

        @if($festeiros->count() > 0)
            <div style="margin-top: 20px;">
                <div class="subsection-title">Festeiros de Promessa</div>
                <table>
                    <thead>
                    <tr>
                        <th>Nome</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($festeiros as $festeiro)
                        <tr>
                            <td style="font-weight: 600;">{{ $festeiro->pessoa->nome }}</td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        @endif
    </div>
@endif

<!-- ARQUIVOS ANEXOS -->
@if($arquivos && $arquivos->count() > 0)
    <div class="section">
        <div class="section-title">Arquivos do Evento</div>
        <table>
            <thead>
            <tr>
                <th>Descrição do Arquivo</th>
            </tr>
            </thead>
            <tbody>
            @foreach($arquivos as $arquivo)
                <tr>
                    <td style="font-weight: 500;">{{ $arquivo->descricao ?: 'Documento' }}</td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
@endif

<!-- RODAPÉ -->
<div class="footer">
    Relatório gerado automaticamente pelo Sistema de Gestão de Eventos<br>
    © {{ now()->year }} - Todos os direitos reservados
</div>
</body>
</html>
