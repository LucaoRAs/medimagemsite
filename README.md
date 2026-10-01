# Med&Imagem — site institucional

Site em **HTML5, CSS3 e JavaScript puro**, pronto para upload na Hostinger. Não precisa de npm, build, banco de dados ou servidor de aplicação. As 17 páginas contêm cabeçalho, navegação, conteúdo e rodapé no próprio HTML; continuam utilizáveis sem JavaScript.

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
- **Termos e privacidade:** `termosdeuso.html` e `politicadeprivacidade.html`. O conteúdo substantivo original foi preservado.
- **Identidade e componentes:** `style/style.css`. As variáveis em `:root` centralizam vinho `#881C56`, azul `#658795`, variante `#638595`, fundos, bordas e espaçamentos. Quicksand local, pesos 400–700; licença em `fonts/OFL.txt`.
- **Interações:** `JS/script.js`, com menu mobile, busca que ignora acentos e maiúsculas e entradas visuais discretas. A busca aparece somente quando o JavaScript está disponível.
- **Carrossel de banners:** `JS/banner-carousel.js`. Mantém as cinco campanhas originais, indicadores, setas, swipe e autoplay de oito segundos. Hover pausa temporariamente; foco e interação param a rotação até o visitante escolher Reproduzir. A rotação para fora da tela, em aba oculta e com `prefers-reduced-motion`. As imagens não são recortadas; legendas e ações também estão disponíveis em HTML. As cópias otimizadas `img/optimized/banner-*` preservam as artes originais e têm versões próprias para celular e desktop.
- **Tema claro/escuro:** `JS/theme.js`, carregado no head antes do CSS para aplicar a preferência antes da primeira pintura. O botão no cabeçalho salva apenas `medimagem-theme` em `localStorage`. Na primeira visita, o site acompanha `prefers-color-scheme`; após a escolha, mantém a preferência entre páginas e recargas. Se o armazenamento for bloqueado, a troca funciona durante a visita. As cores dos dois temas estão no início de `style/style.css`; a marca e as fotografias mantêm suas cores originais.
- **Fotos:** os originais em `img`, `images` e `imgexames` foram preservados. `img/optimized` contém cópias JPEG em dois tamanhos, usadas por `srcset`; não sobrescreva a marca oficial ao editar fotos.

`menu.html`, `footer.html`, `whatsapp-button.html`, `carrossel_exames.html` e `carrossel_galeria.html` são fragmentos HTML de referência, sem documentos ou scripts aninhados. **Não são buscados em tempo de execução.** Ao alterar cabeçalho ou rodapé, replique o conteúdo entre os comentários `início/fim: menu compartilhado` e `início/fim: rodapé compartilhado` em todas as páginas. Preserve o `aria-current="page"` do link correspondente. Ao alterar os serviços ou a galeria, atualize também os fragmentos de referência.

Os arquivos antigos de JS/CSS dos carrosséis de **exames e galeria**, além do aviso antigo de cookies, permanecem como registros de compatibilidade, sem execução nas páginas. O carrossel principal usa `JS/banner-carousel.js`. Nenhuma biblioteca externa é necessária.

## Publicar na Hostinger

O pacote local **`.preview/medimagem-hostinger.zip`** contém os arquivos necessários para publicação, com `index.html` na raiz e sem ferramentas, logs ou histórico Git. As imagens originais continuam no repositório; o pacote usa as cópias otimizadas referenciadas pelo site. Você pode enviar esse ZIP para `public_html` e extrair seu conteúdo ali, após fazer backup do site atual.

1. Faça uma cópia de segurança dos arquivos atualmente em `public_html`.
2. Envie os arquivos HTML da raiz, `sitemap.xml` e as pastas `style`, `JS`, `fonts`, `img`, `images` e `imgexames` para `public_html` pelo gerenciador de arquivos ou FTP. `index.html` deve ficar diretamente dentro de `public_html`.
3. Preserve maiúsculas, minúsculas, acentos e nomes de arquivo. A hospedagem Linux diferencia `JS` de `js` e `faleConosco.html` de `faleconosco.html`.
4. Preserve `googlee3ecfa86bc1fbf12.html`, usado na verificação do Google.
5. Confira o domínio publicado, os exames, contatos e resultados. O sitemap contém todas as 17 páginas; os endereços canônicos mantêm `https://www.medimagem.med.br/`.

Não envie `.git`, `.preview`, `tools`, `Microsoft`, arquivos de teste ou logs. Nenhum DNS, hospedagem ou publicação é alterado por este projeto. O upload é uma etapa manual.

## Recursos externos e privacidade

A página carrega apenas fonte, imagens, CSS e JavaScript locais. Não incorpora mapa, analytics, pixels ou widgets de redes sociais e não grava cookies. O armazenamento local contém somente a preferência de tema escolhida pelo visitante. O aviso antigo de cookies foi removido; não existe preferência de aceite/rejeição a persistir nesta versão. Os links de mapas, WhatsApp, redes sociais e resultados abrem os serviços externos somente por ação do visitante.

Os portais de paciente e médico preservam exatamente os destinos originais, inclusive protocolo HTTP e porta 8081. O site não autentica usuários nem acessa dados de pacientes. A disponibilidade desses sistemas depende de seus respectivos servidores.

**Revisão editorial pendente da clínica:** a política original descreve cookies, login, dados pessoais, parceiros e certificação. Essas declarações foram preservadas por solicitação; a clínica deve revisar o texto para refletir os fluxos e serviços efetivamente utilizados. A reformulação não verifica certificações e não representa aprovação jurídica. Se forem adicionados recursos opcionais de terceiros, reavalie o consentimento antes de carregá-los.

## Validação de desenvolvimento

O script opcional `tools/validate.cjs` verifica páginas, capitalização de caminhos, âncoras, metadados, imagens, fragmentos, sitemap e respostas HTTP locais. Com Node.js instalado e o servidor local ativo, execute `node tools/validate.cjs`. Node não é necessário para visualizar ou publicar o site.

Capturas e relatórios da validação desta reformulação ficam em `.preview/`, pasta local ignorada pelo Git. Consulte `VALIDACAO.md` para o registro final das verificações e limitações.
