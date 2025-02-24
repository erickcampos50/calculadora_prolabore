/**
 * storage.js - Gerenciamento de armazenamento local
 * Implementa funções para salvar e recuperar as configurações e valores do formulário
 */

const StorageManager = {
    /**
     * Salva as configurações no localStorage
     */
    salvarConfiguracoes: function() {
        localStorage.setItem('configCalculadora', JSON.stringify(Config));
    },

    /**
     * Carrega as configurações do localStorage
     */
    carregarConfiguracoes: function() {
        const configSalva = localStorage.getItem('configCalculadora');
        if (configSalva) {
            // Atualiza o objeto Config com os valores salvos
            const configObj = JSON.parse(configSalva);
            Object.assign(Config, configObj);
        }
    },

    /**
     * Salva os valores do formulário no localStorage
     * @param {Object} valores - Objeto contendo os valores a serem salvos
     */
    salvarValores: function(valores) {
        if (valores.salario) localStorage.setItem('salario', valores.salario);
        if (valores.modo) localStorage.setItem('modo', valores.modo);
        if (valores.aliquotaAdicional) localStorage.setItem('aliquotaAdicional', valores.aliquotaAdicional);
        if (valores.cppAliquota) localStorage.setItem('cppAliquota', valores.cppAliquota);
    },

    /**
     * Carrega os valores do formulário do localStorage e preenche os campos
     */
    carregarFormulario: function() {
        const salario = localStorage.getItem('salario');
        const modo = localStorage.getItem('modo');
        const aliquotaAdicional = localStorage.getItem('aliquotaAdicional');
        const cppAliquota = localStorage.getItem('cppAliquota');

        if (salario) $('#salario').val(salario);
        if (modo) $(`input[name="modo"][id="${modo}"]`).prop('checked', true);
        if (aliquotaAdicional) $('#aliquotaAdicional').val(aliquotaAdicional);
        if (cppAliquota) $('#cppAliquota').val(cppAliquota);
    }
};

// Exportar o objeto StorageManager para uso em outros módulos
window.StorageManager = StorageManager;