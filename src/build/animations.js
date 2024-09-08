export function activeElementseAnimations() {
    // Função chamada quando o elemento entra ou sai da viewport
    const handleIntersection = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                if (element.getAttribute('name') === ('greenbtn')) {
                    // Adiciona a animação ao botão
                    element.classList.add('animate-greenPulse');
                    setTimeout(() => element.classList.remove('animate-greenPulse'), 2000);
                }
                if (element.getAttribute('name') === ('container')) {
                    // Adiciona animação para a div
                    setTimeout(() => {
                        element.classList.remove('state0', 'animate-descer');
                        element.classList.add('state100', 'translate-y-[-10px]', 'animate-subir');
                    }, 500);
                    setTimeout(() => {
                        element.classList.remove('state100', 'translate-y-[-10px]', 'animate-subir');
                        element.classList.add('state0', 'animate-descer');
                    }, 2000);
                }
                if (element.getAttribute('name') === ('svg')) {
                    // Adiciona animação para o SVG
                    element.classList.add('animate-chacoalhar');
                    setTimeout(() => element.classList.remove('animate-chacoalhar'), 2000);
                }
            }
        });
    };
    // Configuração do Intersection Observer
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.3 }); // Ajuste conforme necessário)
    // Seleciona os elementos e observa
    document.getElementsByName('greenbtn').forEach(btn => observer.observe(btn));
    document.getElementsByName('container').forEach(cont => observer.observe(cont));
    document.getElementsByName('svg').forEach(svg => observer.observe(svg));
}
document.addEventListener('DOMContentLoaded', activeElementseAnimations);
