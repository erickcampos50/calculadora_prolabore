/**
 * calculator.js - Lógica principal de cálculo
 * Implementa as funções principais de cálculo que utilizam o TaxCalculator
 */

const Calculator = {
    /**
     * Calcula o valor bruto a partir do valor líquido desejado
     * @param {number} valorLiquido - O valor líquido desejado
     * @param {boolean} considerarAliquotaAdicional - Se deve considerar a alíquota adicional
     * @return {number} O valor bruto calculado
     */
    calcularBrutoAPartirDeLiquido: function(valorLiquido, considerarAliquotaAdicional = false) {
        let salarioBruto = valorLiquido;
        let diferencaLiquido = Infinity;
        let iteracoes = 0;
        const maxIteracoes = 1000;
        const aliquotaAdicionalInput = considerarAliquotaAdicional ? $('#aliquotaAdicional').val() : '';
        const aliquotaAdicional = aliquotaAdicionalInput ? parseFloat(aliquotaAdicionalInput) / 100 : 0;

        // Método de aproximação iterativa para encontrar o valor bruto
        while (Math.abs(diferencaLiquido) > 0.01 && iteracoes < maxIteracoes) {
            const inssObj = TaxCalculator.calcularInssProgressivo(salarioBruto);
            const irrfObj = TaxCalculator.calcularIrrfDetalhado(salarioBruto - inssObj.total);
            const adicionalTotal = salarioBruto * aliquotaAdicional;
            const liquidoCalculado = salarioBruto - inssObj.total - irrfObj.total - adicionalTotal;
            diferencaLiquido = valorLiquido - liquidoCalculado;
            salarioBruto += diferencaLiquido / 2;
            iteracoes++;
        }

        return salarioBruto;
    },

    /**
     * Calcula todos os valores relacionados e atualiza a UI
     */
    calcularSalario: function() {
        const modo = $('input[name="modo"]:checked').attr('id');
        const valor = parseFloat($('#salario').val()) || 0;
        const aliquotaAdicionalInput = $('#aliquotaAdicional').val();
        const aliquotaAdicional = aliquotaAdicionalInput ? parseFloat(aliquotaAdicionalInput) / 100 : 0;
        const cppAliquota = parseFloat($('#cppAliquota').val()) || 20;
        const cppAliquotaDecimal = cppAliquota / 100;

        // Salvar valores no localStorage via StorageManager
        StorageManager.salvarValores({
            salario: $('#salario').val(),
            modo: modo,
            aliquotaAdicional: aliquotaAdicionalInput,
            cppAliquota: $('#cppAliquota').val()
        });

        let valorRequisicao, valorDotacao, valorBase, salarioBruto, salarioLiquido, inssObj, irrfObj, adicionalTotal, cppValor;
        let detalhesCalculo = '';

        if (modo === 'calcularBruto') {
            // O usuário quer saber o valor bruto a partir do líquido desejado
            salarioLiquido = valor; // Valor líquido desejado
            
            // Processo inverso para calcular o valor bruto
            salarioBruto = this.calcularBrutoAPartirDeLiquido(salarioLiquido, true);
            
            // Calcula os impostos sobre o bruto calculado
            inssObj = TaxCalculator.calcularInssProgressivo(salarioBruto);
            irrfObj = TaxCalculator.calcularIrrfDetalhado(salarioBruto - inssObj.total);
            adicionalTotal = salarioBruto * aliquotaAdicional;
            
            // CORREÇÃO: O CPP é calculado com base no Valor da requisição do SIGA
            // Primeiro, calculamos o valor da dotação (será o mesmo que o salário bruto)
            valorDotacao = salarioBruto;
            
            // Agora calculamos o CPP com base na dotação
            cppValor = valorDotacao * cppAliquotaDecimal;
            
            // O valor da requisição será a dotação + CPP
            valorRequisicao = valorDotacao + cppValor;
            valorBase = salarioBruto;
            
            detalhesCalculo += `<div class="calculation-section"><h6>Cálculo do Valor Bruto:</h6>`;
            detalhesCalculo += `Valor Líquido Desejado: R$ ${salarioLiquido.toFixed(2)}<br>`;
            detalhesCalculo += `Valor Bruto Calculado: R$ ${salarioBruto.toFixed(2)}<br></div>`;
            
            detalhesCalculo += `<div class="calculation-section"><h6>Cálculo do INSS:</h6>${inssObj.detalhes}</div>`;
            detalhesCalculo += `<div class="calculation-section"><h6>Cálculo do IRRF:</h6>${irrfObj.detalhes}</div>`;
            
            detalhesCalculo += `<div class="calculation-section"><h6>Cálculo do CPP:</h6>`;
            detalhesCalculo += `Valor da requisição do SIGA: R$ ${valorDotacao.toFixed(2)} × ${cppAliquota.toFixed(2)}% = R$ ${cppValor.toFixed(2)}<br></div>`;
            
            detalhesCalculo += `<div class="calculation-section"><h6>Valor da dotação:</h6>`;
            detalhesCalculo += `Valor da Dotação + CPP = R$ ${valorDotacao.toFixed(2)} + R$ ${cppValor.toFixed(2)} = R$ ${valorRequisicao.toFixed(2)}<br></div>`;
            
        } else {
            // O usuário informou o valor da requisição (valor bruto) e quer saber o líquido
            valorRequisicao = valor; // Valor da dotação
            
            // Calcula o CPP e o valor base
            cppValor = valorRequisicao * cppAliquotaDecimal / (1 + cppAliquotaDecimal);
            valorDotacao = valorRequisicao - cppValor;
            valorBase = valorDotacao;
            salarioBruto = valorBase;
            
            // Calcula os impostos sobre o valor base
            inssObj = TaxCalculator.calcularInssProgressivo(salarioBruto);
            irrfObj = TaxCalculator.calcularIrrfDetalhado(salarioBruto - inssObj.total);
            adicionalTotal = salarioBruto * aliquotaAdicional;
            
            // Valor líquido = Valor base - descontos
            salarioLiquido = salarioBruto - inssObj.total - irrfObj.total - adicionalTotal;
            
            detalhesCalculo += `<div class="calculation-section"><h6>Decomposição do Valor da Requisição:</h6>`;
            detalhesCalculo += `Valor da dotação: R$ ${valorRequisicao.toFixed(2)}<br>`;
            detalhesCalculo += `CPP (${cppAliquota.toFixed(2)}%): R$ ${cppValor.toFixed(2)}<br>`;
            detalhesCalculo += `Valor da requisição do SIGA (sobre o qual incidem os demais impostos): R$ ${valorDotacao.toFixed(2)}<br></div>`;
            
            detalhesCalculo += `<div class="calculation-section"><h6>Cálculo do INSS:</h6>${inssObj.detalhes}</div>`;
            detalhesCalculo += `<div class="calculation-section"><h6>Cálculo do IRRF:</h6>${irrfObj.detalhes}</div>`;
        }

        detalhesCalculo += `<div class="calculation-section"><h6>Cálculo da Alíquota Adicional:</h6>`;
        if (aliquotaAdicional > 0) {
            detalhesCalculo += `Valor Base x ${(aliquotaAdicional * 100).toFixed(2)}% = R$ ${adicionalTotal.toFixed(2)}<br></div>`;
        } else {
            detalhesCalculo += `Nenhuma alíquota adicional aplicada.<br></div>`;
        }
        
        if (modo === 'calcularLiquido') {
            detalhesCalculo += `<div class="calculation-section"><h6>Cálculo do Valor Líquido:</h6>`;
            detalhesCalculo += `Valor Base - INSS - IRRF - Alíquota Adicional<br>`;
            detalhesCalculo += `R$ ${valorBase.toFixed(2)} - R$ ${inssObj.total.toFixed(2)} - R$ ${irrfObj.total.toFixed(2)} - R$ ${adicionalTotal.toFixed(2)} = R$ ${salarioLiquido.toFixed(2)}<br></div>`;
        }

        // Atualizar elementos da UI
        $('#calculoDetalhado').html(detalhesCalculo);
        $('#resultadoSalario').text(`R$ ${(modo === 'calcularBruto' ? salarioBruto : salarioLiquido).toFixed(2)}`);
        $('#resultadoLabel').text(modo === 'calcularBruto' ? 'Total com impostos' : 'Valor líquido recebido pelo prestador');
        $('#descontoINSS').text(`R$ ${inssObj.total.toFixed(2)}`);
        $('#descontoIRRF').text(`R$ ${irrfObj.total.toFixed(2)}`);
        $('#descontoAdicional').text(`R$ ${adicionalTotal ? adicionalTotal.toFixed(2) : '0.00'}`);

        // Mostra o valor do CPP
        $('#cppValor').text(`R$ ${cppValor.toFixed(2)}`);

        // Mostra o somatório total (valor da requisição)
        $('#somatorioTotal').text(`R$ ${valorRequisicao.toFixed(2)}`);

        // Mostra o Valor da requisição do SIGA
        $('#valorDotacao').text(`R$ ${valorDotacao.toFixed(2)}`);

        // Adiciona detalhamento para o Valor da requisição do SIGA se ainda não existir
        if (detalhesCalculo.indexOf('Valor da requisição do SIGA:') === -1 && modo === 'calcularBruto') {
            detalhesCalculo += `<div class="calculation-section"><h6>Valor da requisição do SIGA:</h6>`;
            detalhesCalculo += `Neste caso, o Valor da Dotação é igual ao Valor Bruto: R$ ${valorDotacao.toFixed(2)}<br></div>`;
            
            // Atualiza o detalhamento com essa nova informação
            $('#calculoDetalhado').html(detalhesCalculo);
        }
    }
};

// Exportar o objeto Calculator para uso em outros módulos
window.Calculator = Calculator;