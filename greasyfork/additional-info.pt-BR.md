Fecha o chat ao vivo que o YouTube abre sozinho quando você abre um vídeo com chat, como uma transmissão ao vivo. Se você mesmo abrir o chat, ele continua aberto.

## O que faz

- Quando o YouTube abre o chat ao vivo por conta própria, o script o fecha com o botão de fechar do próprio chat.
- Se você mesmo abrir o chat, ele continua aberto nesse vídeo.
- Também funciona quando você passa para outro vídeo sem recarregar a página e em abas em segundo plano (começa quando você muda para a aba).
- Em janelas estreitas o YouTube não abre o chat sozinho, então não há nada para fechar.

## Requisitos

- Site para computador (`www.youtube.com`). O site móvel `m.youtube.com` não é compatível.

## Idiomas

O chat e o botão de fechar são encontrados pelos ids dos elementos, não pelo texto dos botões, então o script não depende do idioma da interface.

## Observações

- O script não envia nenhuma requisição própria e não coleta dados. Ele só clica nos botões do próprio YouTube.
- Ele observa por cerca de 15 segundos depois que o chat aparece, porque às vezes o YouTube abre o chat com atraso. Depois disso, não mexe mais no chat.

## Compatibilidade

- Firefox + Violentmonkey
- Chrome + ScriptCat

## Solução de problemas

1. Abra o console do navegador (F12) e ative o nível de log Verbose/Detalhado.
2. Filtre por `yt-hide-live-chat`.
3. Em funcionamento normal, aparece `checking video` → `closing chat` → `done watching chat`.

- `no live chat`: este vídeo não tem chat ao vivo.
- `chat opened by user, leaving it open`: houve um clique ou uma tecla pouco antes de o chat abrir, então o script considerou que foi você.
- Se o chat continuar aberto e `closing chat` não aparecer, deixe um feedback com o idioma da sua interface e seu navegador.

## Licença

MIT
