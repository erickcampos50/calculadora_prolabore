/**
 * ui-controller.js - Controlador de interface
 * Gerencia os eventos da interface e a atualização dos elementos visuais
 */

const UIController = {
    /**
     * Inicializa os event listeners da interface
     */
    init: function() {
        // Eventos para cálculo ao alterar valores
        $('#salario, input[name="modo"], #aliquotaAdicional, #cppAliquota').on('input change', function() {
            UIController.atualizarInterfaceUsuario();
            Calculator.calcularSalario();
        });

        // Evento para mostrar/ocultar ajuda
        $('#mostrarAjuda').change(function() {
            $('.help-text').toggle(this.checked);
        });

        // Evento para exibir o gráfico quando a aba for selecionada
        $('#grafico-tab').on('shown.bs.tab', function() {
            ChartController.renderizarGrafico();
        });

        // Inicialização das faixas de INSS e IRRF (atualmente desativadas)
        // this.atualizarConfigINSS();
        // this.atualizarConfigIRRF();

        // Eventos para as configurações INSS (atualmente desativados)
        /*
        $('#configINSS').on('input', '.inss-lower, .inss-upper, .inss-aliquota', function() {
            const index = $(this).data('index');
            const lower = parseFloat($(`.inss-lower[data-index="${index}"]`).val()) || 0;
            const upperVal = $(`.inss-upper[data-index="${index}"]`).val();
            const upper = upperVal === '' ? Infinity : parseFloat(upperVal);
            const aliquota = parseFloat($(`.inss-aliquota[data-index="${index}"]`).val()) || 0;

            Config.inss[index].lower = lower;
            Config.inss[index].upper = upper;
            Config.inss[index].aliquota = aliquota;

            StorageManager.salvarConfiguracoes();
            Calculator.calcularSalario();
        });
        */

        // Eventos para as configurações IRRF (atualmente desativados)
        /*
        $('#configIRRF').on('input', '.irrf-lower, .irrf-upper, .irrf-aliquota, .irrf-deducao', function() {
            const index = $(this).data('index');
            const lower = parseFloat($(`.irrf-lower[data-index="${index}"]`).val()) || 0;
            const upperVal = $(`.irrf-upper[data-index="${index}"]`).val();
            const upper = upperVal === '' ? Infinity : parseFloat(upperVal);
            const aliquota = parseFloat($(`.irrf-aliquota[data-index="${index}"]`).val()) || 0;
            const deducao = parseFloat($(`.irrf-deducao[data-index="${index}"]`).val()) || 0;

            Config.irrf[index].lower = lower;
            Config.irrf[index].upper = upper;
            Config.irrf[index].aliquota = aliquota;
            Config.irrf[index].deducao = deducao;

            StorageManager.salvarConfiguracoes();
            Calculator.calcularSalario();
        });
        */

        // Evento para remover faixas (atualmente desativado)
        /*
        $('#configINSS, #configIRRF').on('click', '.remove-faixa', function() {
            const tipo = $(this).data('tipo');
            const index = $(this).data('index');

            if (tipo === 'inss') {
                Config.inss.splice(index, 1);
                UIController.atualizarConfigINSS();
            } else if (tipo === 'irrf') {
                Config.irrf.splice(index, 1);
                UIController.atualizarConfigIRRF();
            }

            StorageManager.salvarConfiguracoes();
            Calculator.calcularSalario();
        });
        */

        // Eventos para adicionar faixas (atualmente desativados)
        /*
        $('#adicionarFaixaINSS').click(function() {
            Config.inss.push({ lower: 0.00, upper: Infinity, aliquota: 0.0 });
            UIController.atualizarConfigINSS();
            StorageManager.salvarConfiguracoes();
        });

        $('#adicionarFaixaIRRF').click(function() {
            Config.irrf.push({ lower: 0.00, upper: Infinity, aliquota: 0.0, deducao: 0.0 });
            UIController.atualizarConfigIRRF();
            StorageManager.salvarConfiguracoes();
        });
        */
    },

    /**
     * Atualiza os textos da interface baseado no modo selecionado
     */
    atualizarInterfaceUsuario: function() {
        // Atualizar o rótulo e placeholder do campo de salário
        if ($('#calcularBruto').is(':checked')) {
            $('#labelSalario').text('Valor líquido acordado com o prestador (R$)');
            $('#salario').attr('placeholder', 'Digite o valor líquido que você deseja alcançar');
            $('#helpTextSalario').text('Informe o valor líquido desejado. O sistema calculará o valor bruto necessário considerando os impostos aplicáveis.');
            $('#resultadoLabel').text('Valor Bruto Necessário (R$)');
        } else {
            $('#labelSalario').text('Orçamento/dotação disponibilizado para o serviço (R$)');
            $('#salario').attr('placeholder', 'Digite o valor bruto que foi disponibilizado para realizar o pagamento');
            $('#helpTextSalario').text('Informe o valor bruto disponibilizado. O sistema calculará o valor líquido final após descontos de impostos.');
            $('#resultadoLabel').text('Valor Líquido Recebido (R$)');
        }
    },

    /**
     * Atualiza a UI de configuração do INSS
     */
    atualizarConfigINSS: function() {
        $('#configINSS').empty();
        Config.inss.forEach((faixa, index) => {
            $('#configINSS').append(`
                <div class="card mb-2" data-index="${index}">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <h6 class="faixa-header">Faixa INSS ${index + 1}</h6>
                            <span class="remove-faixa" data-tipo="inss" data-index="${index}">&times;</span>
                        </div>
                        <div class="row mb-2">
                            <div class="col">
                                <label class="form-label">Limite Inferior (R$)</label>
                                <input type="number" class="form-control inss-lower" data-index="${index}" value="${(faixa.lower ?? 0).toFixed(2)}" step="0.01">
                            </div>
                            <div class="col">
                                <label class="form-label">Limite Superior (R$)</label>
                                <input type="number" class="form-control inss-upper" data-index="${index}" value="${faixa.upper === Infinity ? '' : faixa.upper.toFixed(2)}" step="0.01">
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col">
                                <label class="form-label">Alíquota (decimal)</label>
                                <input type="number" class="form-control inss-aliquota" data-index="${index}" value="${faixa.aliquota}" step="0.001">
                            </div>
                        </div>
                    </div>
                </div>
            `);
        });
    },

    /**
     * Atualiza a UI de configuração do IRRF
     */
    atualizarConfigIRRF: function() {
        $('#configIRRF').empty();
        Config.irrf.forEach((faixa, index) => {
            $('#configIRRF').append(`
                <div class="card mb-2" data-index="${index}">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <h6 class="faixa-header">Faixa IRRF ${index + 1}</h6>
                            <span class="remove-faixa" data-tipo="irrf" data-index="${index}">&times;</span>
                        </div>
                        <div class="row mb-2">
                            <div class="col">
                                <label class="form-label">Limite Inferior (R$)</label>
                                <input type="number" class="form-control irrf-lower" data-index="${index}" value="${(faixa.lower ?? 0).toFixed(2)}" step="1">
                            </div>
                            <div class="col">
                                <label class="form-label">Limite Superior (R$)</label>
                                <input type="number" class="form-control irrf-upper" data-index="${index}" value="${faixa.upper === Infinity ? '' : faixa.upper.toFixed(2)}" step="1">
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col">
                                <label class="form-label">Alíquota (decimal)</label>
                                <input type="number" class="form-control irrf-aliquota" data-index="${index}" value="${faixa.aliquota}" step="1">
                            </div>
                            <div class="col">
                                <label class="form-label">Dedução (R$)</label>
                                <input type="number" class="form-control irrf-deducao" data-index="${index}" value="${faixa.deducao.toFixed(2)}" step="1">
                            </div>
                        </div>
                    </div>
                </div>
            `);
        });
    }
};

// Exportar o objeto UIController para uso em outros módulos
window.UIController = UIController;