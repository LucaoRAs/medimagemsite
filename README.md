# Med&Imagem — site institucional

Site em **HTML5, CSS3 e JavaScript puro**, pronto para upload na Hostinger. Não precisa de npm, build, banco de dados ou servidor de aplicação. As 17 páginas canônicas e as duas URLs jurídicas antigas contêm cabeçalho, navegação, conteúdo e rodapé no próprio HTML; continuam utilizáveis sem JavaScript.

## Visualizar

Abra `index.html` no navegador para uma prévia simples. Para validar caminhos e carregamentos por HTTP, sirva esta pasta com qualquer servidor estático local. Exemplos opcionais, conforme a ferramenta já instalada:

```sh
python -m http.server 8765 --bind 127.0.0.1
```

ou:

```sh
php -S 127.0.0.1:8765 -t .
```

Acesse **http://127.0.0.1:8765/**. Esses comandos são apenas ferramentas locais de desenvolvimento; PHP e Python não fazem parte da aplicação nem são necessários na hospedagem.

## Editar

- **Página inicial:** `index.html`, com o carrossel principal dos cinco banners originais, os 13 exames, clínica, resultados, estrutura e contatos.
- **Exames:** cada arquivo HTML mantém sua URL original, inclusive `mamografiaDigital.html`.
- **Contato:** `faleConosco.html`, com agendamento, recepção e ouvidoria separados. WhatsApp, telefone e e-mail são links diretos; não existe envio de formulário nem chamada à antiga API.
- **Termos e privacidade:** `termos-de-uso.html` e `politica-de-privacidade.html`, com textos baseados nos recursos efetivamente presentes no projeto. `termosdeuso.html` e `politicadeprivacidade.html` mantêm cópias atualizadas, com canonical apontando para os novos endereços. Ao editar o texto jurídico, mantenha as duas versões sincronizadas.
- **Identidade e componentes:** `style/style.css`. As variáveis em `:root` centralizam vinho `#881C56`, azul `#658795`, variante `#638595`, fundos, bordas e espaçamentos. Quicksand local, pesos 400–700; licença em `fonts/OFL.txt`.
- **Interações:** `JS/script.js`, com menu mobile, busca que ignora acentos e maiúsculas e entradas visuais discretas. A busca aparece somente quando o JavaScript está disponível.
- **Carrossel de banners:** `JS/banner-carousel.js`. Mantém as cinco campanhas originais, contador, controles circulares, swipe e autoplay de seis segundos. Hover e foco por teclado pausam enquanto o visitante está no componente; cliques e swipe reiniciam o intervalo, sem deixar a reprodução parada permanentemente. Apenas o botão Pausar mantém a pausa até escolher Reproduzir. Setas do teclado, Home e End permitem navegar. A rotação para fora da tela e em aba oculta. `prefers-reduced-motion` remove os efeitos visuais pelo CSS, sem bloquear a troca automática ou ocultar o controle de pausa. A base da legenda integra o CTA e os controles sem divisórias. As imagens não são recortadas; as cópias otimizadas `img/optimized/banner-*` têm versões próprias para celular e desktop. O primeiro banner tem prioridade de carregamento; os demais mantêm lazy loading e decodificação antes da troca. A altura considera a maior legenda para evitar saltos entre slides.
- **Consentimento:** `JS/cookie-consent.js` e `style/cookie-consent.css`, incluídos em todas as páginas. Card flutuante com aceitar, recusar e preferências; modal nativo com Escape, foco contido e retorno ao acionador. O botão no rodapé reabre as categorias. Sem JavaScript, os links jurídicos continuam disponíveis e o botão do modal permanece oculto.
- **Tema claro/escuro:** `JS/theme.js`, carregado no head antes do CSS para aplicar a preferência antes da primeira pintura. O botão no cabeçalho salva apenas `medimagem-theme` em `localStorage`. Na primeira visita, o site acompanha `prefers-color-scheme`; após a escolha, mantém a preferência entre páginas e recargas. Se o armazenamento for bloqueado, a troca funciona durante a visita. As cores dos dois temas estão no início de `style/style.css`; a marca e as fotografias mantêm suas cores originais.
- **Fotos:** os originais em `img`, `images` e `imgexames` foram preservados. `img/optimized` contém cópias JPEG em dois tamanhos, usadas por `srcset`; não sobrescreva a marca oficial ao editar fotos.

`menu.html`, `footer.html`, `whatsapp-button.html`, `carrossel_exames.html` e `carrossel_galeria.html` são fragmentos HTML de referência, sem documentos ou scripts aninhados. **Não são buscados em tempo de execução.** Ao alterar cabeçalho ou rodapé, replique o conteúdo entre os comentários `início/fim: menu compartilhado` e `início/fim: rodapé compartilhado` em todas as páginas. Preserve o `aria-current="page"` do link correspondente. Ao alterar os serviços ou a galeria, atualize também os fragmentos de referência.

Os arquivos antigos de JS/CSS dos carrosséis de **exames e galeria** permanecem como registros de compatibilidade, sem execução nas páginas. O carrossel principal usa `JS/banner-carousel.js`; o componente de cookies usa `JS/cookie-consent.js`. Nenhuma biblioteca externa é necessária.

## Publicar na Hostinger

Pacote revisado em 05/10/2026: `.preview/medimagem-hostinger-20261005-r2.zip`. Extraia seu conteúdo diretamente em `public_html`: o ZIP contém `index.html` na raiz, as páginas e os assets utilizados, incluindo as logos de 28 anos e os banners de Outubro Rosa. Esta revisão substitui os ZIPs anteriores.

Os erros de `null` relatados correspondem ao `JS/script.js` antigo, disponível no histórico: ele acessava `#celular`, `#menu-container`, `#carrossel`, `#carrossel_galeria` e `#footer`, que não existem mais na HOME. A versão local atual já removeu essa lógica. Publique HTML e assets juntos, substituindo o JavaScript antigo. A HOME agora solicita `JS/script.js?v=20261005` para invalidar o cache anterior; isso não substitui o envio do arquivo atualizado. Caso a hospedagem utilize cache adicional, limpe-o após o upload.

As duas folhas de estilo da HOME também usam `?v=20261005` para evitar reutilizar CSS antigo. `script.js`, `banner-carousel.js` e `cookie-consent.js` usam `defer`; `theme.js` permanece no início do head. Os nomes físicos dos arquivos não incluem `?v=20261005`.

1. Faça uma cópia de segurança dos arquivos atualmente em `public_html`.
2. Envie os arquivos HTML da raiz, `sitemap.xml` e as pastas `style`, `JS`, `fonts`, `img`, `images` e `imgexames` para `public_html` pelo gerenciador de arquivos ou FTP. `index.html` deve ficar diretamente dentro de `public_html`.
3. Preserve maiúsculas, minúsculas, acentos e nomes de arquivo. A hospedagem Linux diferencia `JS` de `js` e `faleConosco.html` de `faleconosco.html`.
4. Preserve `googlee3ecfa86bc1fbf12.html`, usado na verificação do Google.
5. Confira o domínio publicado, os exames, contatos e resultados. O sitemap contém todas as 17 páginas; os endereços canônicos mantêm `https://www.medimagem.med.br/`.

Não envie `.git`, `.preview`, `tools`, `Microsoft`, arquivos de teste ou logs. Nenhum DNS, hospedagem ou publicação é alterado por este projeto. O upload é uma etapa manual.

## Recursos externos e privacidade

A página carrega apenas fonte, imagens, CSS e JavaScript locais. Não incorpora mapa, analytics, pixels ou widgets de redes sociais e não grava cookies HTTP. O armazenamento local mantém `medimagem-theme`, `medimagem_cookie_consent` (`accepted`, `rejected` ou `custom`) e `medimagem_cookie_preferences` (categorias, escolha, versão e data). As categorias opcionais começam desligadas. A escolha persiste entre páginas e sincroniza entre abas; registros inválidos exigem nova escolha. Se o navegador bloquear o armazenamento, a decisão funciona apenas na página e essa limitação é informada.

Não existem scripts opcionais para liberar nesta versão. Futuras integrações devem consultar `window.MedimagemConsent.allows('analytics')` ou `allows('marketing')` antes de carregar/coletar e observar o evento `medimagem:consentchange` para interromper a coleta e remover dados opcionais quando houver revogação. `get()` retorna uma cópia do estado. A API, sozinha, não bloqueia scripts arbitrários: cada integração deve implementar esses controles. Novos serviços/finalidades exigem atualizar política, descrição das categorias e versão do consentimento antes da ativação; o aceite atual não autoriza automaticamente um serviço futuro não informado. As preferências não são enviadas ao servidor por este componente.

Os links de mapas, WhatsApp, redes sociais e resultados abrem os serviços externos somente por ação do visitante. A busca de exames filtra conteúdo localmente, sem transmissão ou persistência do termo.

Os portais de paciente e médico preservam exatamente os destinos originais, inclusive protocolo HTTP e porta 8081. O site não autentica usuários nem acessa dados de pacientes. A disponibilidade desses sistemas depende de seus respectivos servidores.

Os textos jurídicos descrevem o site institucional e diferenciam os ambientes externos de atendimento e resultados. Não afirmam certificações, ferramentas, prazos de retenção ou processos internos que não possam ser identificados no projeto. A configuração de logs da hospedagem e os processos clínicos externos não são verificáveis pelo código deste site.

## Validação de desenvolvimento

O script opcional `tools/validate.cjs` verifica páginas, capitalização de caminhos, âncoras, metadados, imagens, fragmentos, sitemap e respostas HTTP locais. Com Node.js instalado e o servidor local ativo, execute `node tools/validate.cjs`. Node não é necessário para visualizar ou publicar o site.

Capturas e relatórios da validação desta reformulação ficam em `.preview/`, pasta local ignorada pelo Git. Consulte `VALIDACAO.md` para o registro final das verificações e limitações.
