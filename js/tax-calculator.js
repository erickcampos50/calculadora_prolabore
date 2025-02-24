/**
 * tax-calculator.js - Funções para cálculo de impostos
 * Contém as funções relacionadas ao cálculo de INSS, IRRF e outros tributos
 */

const TaxCalculator = {
    /**
     * Calcula o INSS de forma progressiva
     * @param {number} salario - O valor bruto do salário
     * @return {Object} Um objeto contendo o total do INSS e os detalhes do cálculo
     */
    calcularInssProgressivo: function(salario) {
        let inssTotal = 0;
        let detalhes = '';

        for (const faixa of Config.inss) {
            if (salario > faixa.lower) {
                const salarioFaixa = Math.min(salario, faixa.upper) - faixa.lower;
                const contribuicao = salarioFaixa * faixa.aliquota;
                inssTotal += contribuicao;
                detalhes += `(${faixa.lower.toFixed(2)} - ${faixa.upper === Infinity ? '∞' : faixa.upper.toFixed(2)}) x ${(faixa.aliquota * 100).toFixed(1)}% = R$ ${contribuicao.toFixed(2)}<br>`;
            }
        }

        return { total: inssTotal, detalhes: detalhes };
    },

    /**
     * Calcula o IRRF de forma detalhada
     * @param {number} base - O valor base para cálculo do IR (geralmente salário bruto - INSS)
     * @return {Object} Um objeto contendo o total do IRRF e os detalhes do cálculo
     */
    calcularIrrfDetalhado: function(base) {
        let irrfTotal = 0;
        let detalhes = '';

        for (const faixa of Config.irrf) {
            if (base > faixa.lower) {
                const salarioFaixa = Math.min(base, faixa.upper) - faixa.lower;
                const impostoFaixa = salarioFaixa * faixa.aliquota;
                irrfTotal += impostoFaixa;
                detalhes += `(${faixa.lower.toFixed(2)} - ${faixa.upper === Infinity ? '∞' : faixa.upper.toFixed(2)}) x ${(faixa.aliquota * 100).toFixed(1)}% = R$ ${impostoFaixa.toFixed(2)}<br>`;
            }
        }

        // Caso o valor seja maior que a última faixa
        if (base > Config.irrf[Config.irrf.length - 1].lower) {
            const faixa = Config.irrf[Config.irrf.length - 1];
            irrfTotal = base * faixa.aliquota - faixa.deducao;
        }

        // Garantir que não seja negativo
        irrfTotal = Math.max(0, irrfTotal);

        return { total: irrfTotal, detalhes: detalhes };
    },

    /**
     * Calcula a alíquota adicional (ISSQN ou outra)
     * @param {number} salarioBruto - O valor bruto do salário
     * @param {number} aliquota - Percentual da alíquota adicional
     * @return {number} O valor da alíquota adicional
     */
    calcularAliquotaAdicional: function(salarioBruto, aliquota) {
        return salarioBruto * (aliquota / 100);
    },

    /**
     * Calcula o CPP (Contribuição Previdenciária Patronal)
     * @param {number} salarioBruto - O valor bruto do salário
     * @param {number} aliquota - Percentual da alíquota do CPP
     * @return {number} O valor do CPP
     */
    calcularCPP: function(salarioBruto, aliquota) {
        return salarioBruto * (aliquota / 100);
    }
};

// Exportar o objeto TaxCalculator para uso em outros módulos
window.TaxCalculator = TaxCalculator;