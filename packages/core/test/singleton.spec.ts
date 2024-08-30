import { expect } from 'chai';
import { Singleton } from '../abstracts/singleton.abstract';

class MySingleton extends Singleton {
    // Classe derivada de Singleton para teste
}

describe('Singleton', () => {

    it('deve retornar a mesma instância ao chamar getInstance duas vezes', () => {
        const instance1 = MySingleton.getInstance();
        const instance2 = MySingleton.getInstance();
        
        expect(instance1).to.equal(instance2);
        expect(instance1).to.be.an.instanceof(MySingleton);
    });

    it('deve criar uma nova instância após clearInstance ser chamado', () => {
        const instance1 = MySingleton.getInstance();
        MySingleton.clearInstance();
        const instance2 = MySingleton.getInstance();
        
        expect(instance1).to.not.equal(instance2);
        expect(instance2).to.be.an.instanceof(MySingleton);
    });

    it('deve lançar um erro ao tentar instanciar uma classe abstrata', () => {
        class AbstractSingleton extends Singleton {}
        expect(() => AbstractSingleton.getInstance()).to.throw();
    });
});
