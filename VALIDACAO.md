# Registro da reformulação — Med&Imagem

Validação local em 1 de outubro de 2026, com servidor HTTP estático e Microsoft Edge (Chromium) em modo headless. Não houve publicação, alteração de DNS, login nos portais ou envio de mensagens.

## Escopo entregue

- 17 páginas com a identidade original, Quicksand local e cores institucionais centralizadas em variáveis.
- Cinco banners originais no carrossel principal da home, com imagens responsivas, legendas em HTML, controles, swipe, autoplay de oito segundos e pausas acessíveis.
- Temas claro e escuro em todas as páginas, preferência do sistema e persistência da escolha do visitante.
- Grade com os 13 exames, busca sem distinção de acentos/maiúsculas e estado vazio.
- Contato estático, separado entre agendamento, recepção e ouvidoria.
- Conteúdo original dos exames e textos legais preservado, com comparação automatizada. Durações mantidas; correção gramatical de “Entre X a Y” para “De X a Y”.
- Cabeçalho e rodapé presentes no HTML de cada página, sem dependência de fetch de fragmentos.
- 48 cópias otimizadas de fotos/banners. Arquivos oficiais da marca e imagens originais preservados.

## Verificações

- 17 páginas × 7 larguras × 2 temas: **238 combinações** verificadas em 360, 390, 768, 1024, 1440, 1920 e 2560 px. Sem rolagem horizontal nas verificações.
- Menu mobile, Escape e retorno de foco; navegação por teclado e link para pular ao conteúdo.
- Busca por nome, acento, maiúsculas, nenhum resultado e limpeza com retorno do foco.
- Tema inicial do sistema, atualização do sistema sem preferência explícita, alternância por botão/teclado e persistência entre páginas e recargas.
- Carrossel: autoplay com espera real, pausa durante hover, retomada, pausa explícita, indicadores, primeiro/último banner, setas de teclado, swipe por eventos de toque do navegador e movimento reduzido.
- Conferência de variantes mobile dos banners em navegação mobile; imagens desktop e mobile são selecionadas por `picture`/`srcset`.
- Nenhum erro JavaScript ou recurso local HTTP 404 na execução final; nenhum recurso de terceiros carregado automaticamente.
- Somente a preferência `medimagem-theme` no armazenamento local; sem cookies ou armazenamento de rastreamento. O aviso antigo foi removido.
- Navegação e conteúdo essenciais disponíveis com JavaScript desativado.
- 72 caminhos locais verificados por HTTP, incluindo HTML, imagens, fontes e scripts; capitalização, âncoras, IDs, metadados, Open Graph, um h1 por página e dimensões das imagens conferidos.
- Sitemap com as 17 páginas e arquivo de verificação do Google preservado.
- `git diff --check` sem problemas.

Foram inspecionadas capturas da home, contato, exame de ressonância e página de privacidade, em desktop e celular, nos dois temas. As capturas e relatórios ficam em `.preview/`, fora dos arquivos de publicação.

Os pares principais de cores foram calculados: texto claro 11,66:1; texto secundário claro 5,46:1; texto sobre botão vinho 8,95:1; texto no tema escuro 13,80:1; texto secundário escuro 8,05:1. Isso não equivale a uma certificação completa de acessibilidade.

## Destinos externos

- Portais originais de paciente e médico: resposta HTTP 200, sem autenticação.
- WhatsApp de agendamento e ouvidoria: redirecionamentos HTTP 302 para os números preservados, sem envio de mensagens.
- Instagram: resposta HTTP 200.
- Facebook: a conexão expirou neste ambiente. O endereço original foi mantido; sua disponibilidade não pôde ser confirmada por esta verificação.
- Links de telefone, e-mail e localização conferidos no HTML; nenhuma ligação ou mensagem foi realizada.

## Limitações e revisão editorial

A política de privacidade foi preservada integralmente, mas contém descrições de cookies, login, parceiros, tratamento de dados e certificação que precisam ser revisadas pela clínica à luz do fluxo atual. As declarações não foram verificadas juridicamente nem usadas para acrescentar novos selos ou alegações ao site.

Não foram realizados testes em dispositivos físicos, Safari ou Firefox, nem medições de Core Web Vitals em produção. Não há notas de Lighthouse ou resultados de desempenho inventados. A disponibilidade futura dos portais e redes sociais depende desses serviços.

## Arquivos principais alterados

- Páginas: `index.html`, `faleConosco.html`, `termosdeuso.html`, `politicadeprivacidade.html`.
- Exames: `ressonancia_magnetica.html`, `tomografia.html`, `ultrassonografia.html`, `mamografiaDigital.html`, `densitometria_ossea.html`, `radiografia.html`, `laboratorio.html`, `ecocardiograma.html`, `eletrocardiograma.html`, `holter.html`, `mapa.html`, `teste_ergometrico.html`, `puncao_biopsia.html`.
- Fragmentos: `menu.html`, `footer.html`, `whatsapp-button.html`, `carrossel_exames.html`, `carrossel_galeria.html`.
- Estilos: `style/style.css` e os três arquivos de compatibilidade nessa pasta.
- Scripts: `JS/script.js`, novos `JS/theme.js` e `JS/banner-carousel.js`, e os três scripts antigos de compatibilidade.
- Assets e documentação: `img/optimized/`, `fonts/`, `sitemap.xml`, `README.md`, `VALIDACAO.md`, `.gitignore` e utilitários locais em `tools/`.

O diretório `Microsoft/`, já presente como arquivo não rastreado antes do trabalho, não foi alterado nem incluído no pacote.
