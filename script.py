import json

def substituir_virgula_por_ponto(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
    
    for item in data:
        if 'precoContratual' in item:
            preco = item['precoContratual']
            if isinstance(preco, str):
                item['precoContratual'] = preco.replace(',', '.')
    
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

    print("Substituição concluída.")

file_path = 'contratos.json'

substituir_virgula_por_ponto(file_path)