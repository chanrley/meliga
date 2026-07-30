Ordem sugerida de CI/CD do mais essencial ao mais avançado:

OK:
1 - Lint/format check no CI — já tem (prettier, htmlhint). Base de tudo.
2- Branch protection na main — bloquear push direto, exigir PR.
3 - Status checks obrigatórios — CI (lint) precisa passar antes do merge.
4 - Jobs dependentes (needs) — ex.: test só roda depois de lint passar.
5 - Testes automatizados — mesmo que simulados no início (echo "rodando testes..."), depois testes reais se o projeto crescer.
6 - Build com artifact — gerar e guardar o output (upload-artifact), mesmo que seja só empacotar o HTML/CSS/JS.
NOK:

    7 - Exigir aprovação de revisor (code review) no PR, além do CI verde.
    8 - CD — deploy automático (ex.: GitHub Pages) disparado só no merge na main, dependente do build.
    9 - Ambientes (staging/produção) — deploy em staging primeiro, produção manual ou com aprovação (environment + required reviewers no workflow).
    10 - Notificações — falha de pipeline avisando por Slack/e-mail/etc.
    11 - Cache de dependências (actions/cache) — otimização, não essencial num projeto pequeno.
    12 - Versionamento automático / changelog / tags de release — nível mais avançado, fecha o ciclo de entrega.
