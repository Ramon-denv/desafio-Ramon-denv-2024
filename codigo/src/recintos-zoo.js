class RecintosZoo {


    constructor() {
        // Conjunto de recintos, cada um com número, bioma, tamanho e animais presentes
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] },
        ];
        // Dados sobre os animais permitidos, incluindo tamanho, biomas e se são carnívoros
        this.animaisPermitidos = {
            'LEAO': { tamanho: 3, biomas: ['savana'], carnivoro: true },
            'LEOPARDO': { tamanho: 2, biomas: ['savana'], carnivoro: true },
            'CROCODILO': { tamanho: 3, biomas: ['rio'], carnivoro: true },
            'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            'GAZELA': { tamanho: 2, biomas: ['savana'], carnivoro: false },
            'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false },
        };
    }
    // Método para analisar quais recintos são viáveis para um determinado animal e quantidade
    analisaRecintos(animal, quantidade) {

        // Verifica se o animal é válido
        if (!this.animaisPermitidos[animal]) {
            return { erro: 'Animal inválido' };
        }
        // Verifica se a quantidade é válida
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: 'Quantidade inválida' };
        }
        // Obtém informações sobre o animal
        const animalInfo = this.animaisPermitidos[animal];
        // Calcula o espaço necessário para o animal
        const espacoNecessario = quantidade * animalInfo.tamanho;
        // Array para armazenar os recintos viáveis
        const recintosViaveis = [];
        // Itera sobre os recintos para verificar se são viáveis
        this.recintos.forEach(recinto => {
            // Calcula o espaço ocupado no recinto
            const espacoOcupado = recinto.animais.reduce((total, a) => total + a.quantidade * this.animaisPermitidos[a.especie].tamanho, 0);
            // Calcula o espaço livre no recinto
            const espacoLivre = recinto.tamanho - espacoOcupado;
            // Verifica se o recinto é viável para o animal
            if (!animalInfo.biomas.some(x => recinto.bioma.includes(x))) return;
            // Calcula o espaço livre no recinto após a adição do animal
            if (espacoLivre < espacoNecessario) return;
            // Verifica se o animal é carnívoro e se há animais carnívoros no recinto
            if (animalInfo.carnivoro) {
                if (recinto.animais.length > 0 && recinto.animais[0].especie !== animal) return;
            }else if(recinto.animais.some(x => this.animaisPermitidos[x.especie].carnivoro === true)){
                return;
            }
            else {
                if (animal === 'MACACO' && recinto.animais.length === 0 && quantidade === 1) return;
            }
            // Adiciona o recinto à lista de recintos viáveis
            if (recinto.animais.length > 0 && recinto.animais[0].especie !== animal) {
                if (espacoLivre < espacoNecessario + 1) return;
            }
            // Adiciona o recinto à lista de viáveis com detalhes sobre o espaço livre
            recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - espacoNecessario} total: ${recinto.tamanho})`);
        });
        // Retorna os recintos viáveis ou uma mensagem de erro
        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável' };
        }
        // Retorna a lista de recintos viáveis
        return { recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };
