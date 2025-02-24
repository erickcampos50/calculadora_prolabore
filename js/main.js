/**
 * main.js - Arquivo JS principal
 * Inicializa a aplicação e coordena os outros módulos
 */

$(document).ready(function() {
    // Carregar configurações salvas (se existirem)
    try {
        StorageManager.carregarConfiguracoes();
    } catch (error) {
        console.error('Erro ao carregar configurações:', error);
    }

    // Carregar valores do formulário salvos (se existirem)
    try {
        StorageManager.carregarFormulario();
    } catch (error) {
        console.error('Erro ao carregar formulário:', error);
    }

    // Inicializar controlador de UI
    UIController.init();
    
    // Atualizar a interface conforme o modo selecionado
    UIController.atualizarInterfaceUsuario();
    
    // Calcular os valores iniciais
    Calculator.calcularSalario();

    // Log de inicialização
    console.log('Calculadora de Pagamentos inicializada com sucesso!');
});