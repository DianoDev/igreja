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

        /* Estilos para grupos responsáveis compactos */
        .grupos-compacto {
            background: #f7fafc;
            border: 1px solid #e2e8f0;
            padding: 8px 12px;
            margin-bottom: 12px;
            font-size: 11px;
            line-height: 1.5;
        }

        .grupos-compacto .grupo-nome {
            font-weight: 700;
            color: #2d3748;
            display: inline;
        }

        .grupos-compacto .grupo-integrantes {
            color: #4a5568;
            display: inline;
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


<!-- CARDÁPIO -->
@if($evento->cardapios && $evento->cardapios->count() > 0)
    <div class="section">
        <div class="section-title">Prestação de Contas do Evento</div>

        <!-- GRUPOS RESPONSÁVEIS (COMPACTO) -->
        @if($evento->grupos && $evento->grupos->count() > 0)
            @foreach($evento->grupos as $grupo)
                <div class="grupos-compacto">
                    <span class="grupo-nome">{{ $grupo->nome }}:</span>
                    <span class="grupo-integrantes">
                        @if($grupo->pessoas && $grupo->pessoas->count() > 0)
                            {{ $grupo->pessoas->pluck('pessoa.nome')->filter()->implode(', ') }}
                        @else
                            Nenhum integrante
                        @endif
                    </span>
                </div>
            @endforeach
        @endif

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
                            <th style="width: 40%;">Ingrediente</th>
                            <th style="width: 20%;">Quantidade</th>
                            <th style="width: 20%;" class="text-right">Valor Unit.</th>
                            <th style="width: 20%;" class="text-right">Valor Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($cardapio->ingredientes as $ingrediente)
                            <tr>
                                <td style="font-weight: 600;">{{ $ingrediente->nome }}</td>
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
<div class="section" style="page-break-before: always;">
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

<!-- RESUMO FINANCEIRO -->
<div class="section">
    <div class="section-title">Resumo Financeiro</div>

    <!-- ENTRADA -->
    <div class="info-box" style="border-left-color: #2f855a; background: #f0fff4; margin-bottom: 20px;">
        <div style="font-size: 15px; font-weight: 700; color: #2f855a; margin-bottom: 12px; text-transform: uppercase;">
            ENTRADA
        </div>
        <div style="margin-bottom: 10px;">
            <strong style="color: #2d3748;">Valor Arrecadado em Dinheiro:</strong>
            <span style="float: right; font-size: 16px; font-weight: 700; color: #2f855a;">
                R$ {{ number_format($evento->valor_arrecadado, 2, ',', '.') }}
            </span>
        </div>
        <div style="margin-bottom: 10px;">
            <strong style="color: #2d3748;">Valor Arrecadado em Produtos:</strong>
            <span style="float: right; font-size: 16px; font-weight: 700; color: #2f855a;">
                R$ {{ number_format($valor_doacoes_comida, 2, ',', '.') }}
            </span>
        </div>
        <div style="border-top: 2px solid #2f855a; margin-top: 12px; padding-top: 12px;">
            <strong style="color: #2d3748; font-size: 15px;">TOTAL DE ENTRADA:</strong>
            <span style="float: right; font-size: 18px; font-weight: 700; color: #2f855a;">
                R$ {{ number_format($evento->valor_arrecadado + $valor_doacoes_comida, 2, ',', '.') }}
            </span>
        </div>
    </div>

    <!-- SAÍDA -->
    <div class="info-box" style="border-left-color: #c53030; background: #fff5f5; margin-bottom: 20px;">
        <div style="font-size: 15px; font-weight: 700; color: #c53030; margin-bottom: 12px; text-transform: uppercase;">
            SAÍDA
        </div>
        <div style="margin-bottom: 10px;">
            <strong style="color: #2d3748;">Valor Gasto Previsto:</strong>
            <span style="float: right; font-size: 16px; font-weight: 700; color: #c53030;">
                R$ {{ number_format($evento->cardapios && $evento->cardapios->count() > 0 ? $evento->cardapios->sum(function($cardapio) { return $cardapio->ingredientes->sum('valor_total'); }) : 0, 2, ',', '.') }}
            </span>
        </div>
        <div style="border-top: 2px solid #c53030; margin-top: 12px; padding-top: 12px;">
            <strong style="color: #2d3748; font-size: 15px;">TOTAL DE SAÍDA:</strong>
            <span style="float: right; font-size: 18px; font-weight: 700; color: #c53030;">
                R$ {{ number_format($evento->cardapios && $evento->cardapios->count() > 0 ? $evento->cardapios->sum(function($cardapio) { return $cardapio->ingredientes->sum('valor_total'); }) : 0, 2, ',', '.') }}
            </span>
        </div>
    </div>

    <!-- RESULTADO -->
    @php
        $total_entrada = $evento->valor_arrecadado + $valor_doacoes_comida;
        $total_saida = $evento->cardapios && $evento->cardapios->count() > 0 ? $evento->cardapios->sum(function($cardapio) { return $cardapio->ingredientes->sum('valor_total'); }) : 0;
        $resultado = $total_entrada - $total_saida;
        $cor_resultado = $resultado > 0 ? '#2f855a' : ($resultado < 0 ? '#c53030' : '#4a5568');
        $bg_resultado = $resultado > 0 ? '#f0fff4' : ($resultado < 0 ? '#fff5f5' : '#f7fafc');
    @endphp
    <div class="info-box" style="border-left-color: {{ $cor_resultado }}; background: {{ $bg_resultado }};">
        <div style="font-size: 15px; font-weight: 700; color: {{ $cor_resultado }}; margin-bottom: 12px; text-transform: uppercase;">
            RESULTADO
        </div>
        <div style="text-align: center; padding: 10px 0;">
            <div style="font-size: 24px; font-weight: 700; color: {{ $cor_resultado }};">
                R$ {{ number_format($resultado, 2, ',', '.') }}
            </div>
            <div style="font-size: 12px; color: #718096; margin-top: 8px; font-style: italic;">
                {{ $resultado > 0 ? 'Saldo Positivo' : ($resultado < 0 ? 'Saldo Negativo' : 'Saldo Neutro') }}
            </div>
        </div>
    </div>
</div>

<!-- RODAPÉ -->
<div class="footer">
    Relatório gerado automaticamente pelo Sistema de Gestão de Eventos<br>
    © {{ now()->year }} - Todos os direitos reservados
</div>
</body>
</html>
