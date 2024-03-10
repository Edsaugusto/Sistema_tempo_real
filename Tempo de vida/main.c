#include <stdio.h>
#include <time.h>

int main() {
    int dia, mes, ano;

    printf("Qual sua data de nascimento? dd/mm/aaaa ");
    scanf("%d %d %d", &dia, &mes, &ano);

    // Obtendo informações da data atual
    time_t dataAtual;
    time(&dataAtual);

    // Convertendo a data de nascimento para segundos
    struct tm nascimento = {0};  // Inicializa a estrutura tm com zeros
    nascimento.tm_year = ano - 1900;
    nascimento.tm_mon = mes - 1;
    nascimento.tm_mday = dia;
    nascimento.tm_hour = 0;
    nascimento.tm_min = 0;
    nascimento.tm_sec = 0;

    // Convertendo de tm para tempo em segundos
    time_t nascimento_segundos = mktime(&nascimento);

    // Retornando a diferença entre 2 tempos
    double diff_segundos = difftime(dataAtual, nascimento_segundos);



    return 0;
}

