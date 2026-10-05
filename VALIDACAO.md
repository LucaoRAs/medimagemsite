# Registro da reformulação — Med&Imagem

## Revisão para Hostinger — 05/10/2026

Complemento da revisão (r2): versionadas também as URLs `style/style.css?v=20261005` e `style/cookie-consent.css?v=20261005` na HOME. Os arquivos físicos e seu conteúdo foram preservados. Confirmados `defer` nos scripts de interação e execução antecipada de `theme.js`. Nova execução em Edge verificou ambas as folhas carregadas e interpretadas, fonte e estilos computados aplicados, além das 14 combinações de largura/tema e interações descritas abaixo. Sem erros JavaScript ou HTTP. A causa do CSS ausente na hospedagem não foi confirmada remotamente; versionamento evita reutilização de cache anterior, mas requer upload das folhas atuais. Pacote mais recente: `.preview/medimagem-hostinger-20261005-r2.zip`. Não houve publicação remota.

- A cópia local de `JS/script.js` já não contém os carregamentos legados. No histórico (`01ed753`), os erros relatados vêm de `getElementById('celular').addEventListener` e dos destinos `menu-container`, `carrossel`, `carrossel_galeria` e `footer`. Esses IDs não existem na HOME atual; os componentes já estão no HTML. Não é necessário recriar placeholders nem reescrever os scripts.
- Alteração funcional restrita à URL `JS/script.js?v=20261005` na HOME, para solicitar uma versão nova ao navegador. É indispensável enviar também o JavaScript atual. A versão efetivamente servida pela hospedagem não pôde ser confirmada nesta sessão; cache antigo ou upload incompleto continuam sendo hipóteses para a divergência.
- Conferidos 31 arquivos HTML/CSS/JS e 73 referências locais: nenhum caminho ausente, diferença de capitalização, referência a localhost ou caminho Windows. Nenhum caminho de asset precisou ser corrigido.
- Teste em Edge headless por HTTP estático com checagem de capitalização, em 320, 375, 430, 768, 1024, 1366 e 1920 px, nos temas claro e escuro: menu, redes sociais, topbar, telefone, logos, imagens, HTML e cookies aprovados, sem overflow horizontal, exceções JavaScript ou respostas HTTP >= 400.
- Testados os banners de Outubro Rosa em 390 e 1440 px, autoplay com espera real, setas, pausa/play, Home/End, swipe por eventos de ponteiro e pausa fora da viewport. O indicador existente é o contador `01 / 05`, validado após navegação. O HTML atual não tem botões de indicadores individuais; o layout foi preservado.
- Cookies recusados persistem após reload. Os links externos mantêm `noopener noreferrer`; seus destinos foram preservados, sem testar atendimento ou autenticação nos serviços externos.
- Quicksand existe, está declarada em `@font-face`, é utilizada pelo CSS e carregou no navegador. O preload aponta para o mesmo arquivo, com `as="font"`, `type="font/woff2"` e `crossorigin`; foi preservado. Não foi necessário remover a fonte nem alterar sua configuração.
- Pacote `.preview/medimagem-hostinger-20261005.zip` gerado com as páginas e dependências estáticas, incluindo banners e logos atuais. `index.html` está na raiz do ZIP. Não inclui servidor, ferramentas, logs ou dependências de desenvolvimento. Publicação na Hostinger não executada.

Relatórios locais: `.preview/hostinger-paths.json`, `.preview/hostinger-check.json` e `.preview/hostinger-extra.json`.

## Correção da retomada automática do carrossel

Validação no Chrome, abrindo `index.html` diretamente: 10 verificações aprovadas com esperas reais, cobrindo autoplay, retomada após clique nas setas, hover, pausa explícita e foco por teclado, com e sem redução de animações. Relatório local: `.preview/autoplay-fix-validation.json`.

Após o relato de que os banners não avançavam sozinhos, a pausa permanente causada por cliques/foco foi substituída por reinício do intervalo de seis segundos. Hover e foco por teclado pausam enquanto presentes; a reprodução retoma ao sair. Somente o botão Pausar mantém a interrupção até um comando explícito de Reproduzir. A preferência `prefers-reduced-motion` atua apenas nos efeitos visuais do CSS, sem bloquear o autoplay nem ocultar seu botão. Esta correção substitui as observações anteriores sobre pausa permanente após interação e bloqueio por redução de movimento.

## Atualização do carrossel e da parte jurídica — 1 de outubro de 2026

Escopo desta etapa: carrossel da home, consentimento, páginas jurídicas e integração no rodapé. Comparação com Git confirmou que o conteúdo principal das outras 14 páginas e todas as demais seções da home permaneceram intactos. As cinco artes e suas variantes originais foram preservadas.

- Validador estático: **19 documentos e 76 recursos locais, zero falhas**. URLs jurídicas antigas mantêm cópias dos novos textos e canonical atualizado; sitemap com 17 URLs canônicas.
- Chrome headless: **218 verificações aprovadas**, sem erros JavaScript ou chamadas automáticas a terceiros. Relatório local em `.preview/feature-validation.json`.
- Carrossel: cinco slides em 320, 390, 700, 768 e 1440 px, temas claro e escuro; sem overflow horizontal, sobreposição de CTA pelos controles ou alteração da altura na troca. Capturas inspecionadas em desktop e celular.
- Autoplay de seis segundos observado com espera real; pausa no hover, retomada ao sair, pausa após interação, navegação circular, setas/Home/End e swipe por eventos reais de toque via Chromium DevTools. Preferência de redução de animações respeitada, sem mensagem visível; navegação manual continua disponível.
- Carregamento: apenas a imagem do primeiro banner solicitada inicialmente, confirmado em 320, 390, 768 e 1440 px. Os demais carregam ao navegar; altura permanece estável.
- Cookies: escolhas `accepted`, `rejected` e `custom`; categorias independentes; persistência entre páginas/recargas; revogação sincronizada entre abas; fechamento sem salvar; Escape, retorno e contenção de foco; armazenamento bloqueado e registros inválidos. Nenhum script de analytics/marketing foi adicionado.
- Novas páginas jurídicas verificadas em 320, 390, 768 e 1440 px, nos dois temas. Textos baseados nos fluxos observáveis do site, com referências à LGPD e ao guia da ANPD na política.
- Sem JavaScript: primeira campanha, conteúdo e links jurídicos continuam acessíveis; o botão do modal fica oculto.

Não houve publicação. Testes locais em Chromium não substituem avaliação em dispositivos físicos ou medição de Core Web Vitals em produção. Logs da hospedagem e processos internos dos serviços externos não são verificáveis neste repositório.

## Histórico da reformulação anterior

O registro abaixo descreve a etapa anterior. As observações antigas sobre ausência de consentimento e preservação dos textos jurídicos foram substituídas pela atualização acima.

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
