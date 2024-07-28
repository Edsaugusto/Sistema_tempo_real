import random
import time
import threading
import matplotlib.pyplot as plt

# Algoritmo BubbleSort
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

# Função para mesclar arrays ordenados
def merge(arrays):
    resultado = []
    indices = [0] * len(arrays)
    
    while True:
        valor_minimo = float('inf')
        indice_minimo = -1
        
        for i in range(len(arrays)):
            if indices[i] < len(arrays[i]) and arrays[i][indices[i]] < valor_minimo:
                valor_minimo = arrays[i][indices[i]]
                indice_minimo = i
        
        if indice_minimo == -1:
            break
        
        resultado.append(valor_minimo)
        indices[indice_minimo] += 1
    
    return resultado

# Função para medir o desempenho
def medir_desempenho(N, usar_threads):
    # Gerar amostras aleatórias
    random.seed(0)
    amostras = [random.randint(0, 1000000) for _ in range(80000)]
    
    # Dividir as amostras em N subvetores
    subvetores = [amostras[i::N] for i in range(N)]
    
    inicio = time.time()
    
    if usar_threads:
        threads = []
        for subvetor in subvetores:
            thread = threading.Thread(target=bubble_sort, args=(subvetor,))
            threads.append(thread)
            thread.start()
        
        for thread in threads:
            thread.join()
    else:
        for subvetor in subvetores:
            bubble_sort(subvetor)
    
    # Mesclar subvetores ordenados
    vetor_ordenado = merge(subvetores)
    
    fim = time.time()
    
    return fim - inicio

# Função principal para executar o experimento
def executar_experimento():
    Ns = [1, 2, 4, 8, 16]
    tempos_sequenciais = []
    tempos_paralelos = []
    
    for N in Ns:
        tempo_seq = medir_desempenho(N, usar_threads=False)
        tempo_par = medir_desempenho(N, usar_threads=True)
        
        tempos_sequenciais.append(tempo_seq)
        tempos_paralelos.append(tempo_par)
        
        print(f"N={N}: Tempo Sequencial = {tempo_seq:.2f}s, Tempo Paralelo = {tempo_par:.2f}s")
    
    # Plotar resultados
    plt.plot(Ns, tempos_sequenciais, label='Sequencial')
    plt.plot(Ns, tempos_paralelos, label='Paralelo')
    plt.xlabel('Número de Subvetores (N)')
    plt.ylabel('Tempo (segundos)')
    plt.title('Desempenho do MergeSort com BubbleSort')
    plt.legend()
    plt.show()

# Executar o experimento
executar_experimento()
