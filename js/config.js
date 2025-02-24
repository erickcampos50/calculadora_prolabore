/**
 * config.js - Configurações e parâmetros do sistema
 * Contém as tabelas de faixas de INSS e IRRF utilizadas nos cálculos
 */

// Objeto global de configuração
const Config = {
    // Faixas do INSS (configuração inicial)
    inss: [
        { lower: 0.00, upper: 8157.41, aliquota: 0.11 }
    ],
    
    // Faixas do IRRF (configuração inicial)
    irrf: [
        { lower: 0.00, upper: 2259.20, aliquota: 0.0, deducao: 0.00 },
        { lower: 2259.21, upper: 2826.65, aliquota: 0.075, deducao: 169.44 },
        { lower: 2826.66, upper: 3751.05, aliquota: 0.15, deducao: 381.44 },
        { lower: 3751.06, upper: 4664.68, aliquota: 0.225, deducao: 662.77 },
        { lower: 4664.69, upper: Infinity, aliquota: 0.275, deducao: 896.00 }
    ],
    
    // Alíquota padrão para CPP
    cppAliquota: 20,
    
    // Alíquota adicional (será atualizada pela UI)
    aliquotaAdicional: 0
};

// Exportar o objeto de configuração para uso em outros módulos
window.Config = Config;