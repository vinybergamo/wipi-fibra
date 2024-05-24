export const consultarCEP = async (cep: string) => {
    let enderecoJSON = await fetch(`/api/cep`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ zipcode: cep }) });
    if (enderecoJSON.status !== 200) {
        return false
    }
    const endereco = await enderecoJSON.json()
    return endereco
}

export const validarCPF = (cpf: string): boolean => {
    // Remover caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');

    // Verificar se o CPF tem 11 dígitos
    if (cpf.length !== 11) return false;

    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Calcular o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = soma % 11;
    let digitoVerificador1 = resto < 2 ? 0 : 11 - resto;

    // Calcular o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = soma % 11;
    let digitoVerificador2 = resto < 2 ? 0 : 11 - resto;

    // Verificar se os dígitos verificadores são válidos
    return parseInt(cpf.charAt(9)) === digitoVerificador1 && parseInt(cpf.charAt(10)) === digitoVerificador2;
};

export const validarCNPJ = (cnpj: string): boolean => {
    // Remover caracteres não numéricos
    cnpj = cnpj.replace(/\D/g, '');

    // Verificar se o CNPJ tem 14 dígitos
    if (cnpj.length !== 14) return false;

    // Calcular o primeiro dígito verificador
    let soma = 0;
    let peso = 5;
    for (let i = 0; i < 12; i++) {
        soma += parseInt(cnpj.charAt(i)) * peso;
        peso = peso === 2 ? 9 : peso - 1;
    }
    let digitoVerificador1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    // Calcular o segundo dígito verificador
    soma = 0;
    peso = 6;
    for (let i = 0; i < 13; i++) {
        soma += parseInt(cnpj.charAt(i)) * peso;
        peso = peso === 2 ? 9 : peso - 1;
    }
    let digitoVerificador2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    // Verificar se os dígitos verificadores são válidos
    return parseInt(cnpj.charAt(12)) === digitoVerificador1 && parseInt(cnpj.charAt(13)) === digitoVerificador2;
};

export const consultarViabilidade = async (data: string) => {
    let viabilidadeJSON = await fetch(`/api/viabilidade`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data,
    })
    if (viabilidadeJSON.status == 200) {
        const res = await viabilidadeJSON.json()
        return res
    } else return { availabilityDescription: 'Inviável' }
}