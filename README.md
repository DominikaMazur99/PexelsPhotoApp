1. **Sklonuj repozytorium** lub **pobierz projekt**:
    ```bash
    git clone <URL-repozytorium>
    ```

2. **Wejdź na stronę [Pexels](https://www.pexels.com/) i utwórz konto**, a następnie **wygeneruj klucz API**.

3. **Utwórz plik `.env`** w głównym katalogu projektu i dodaj w nim następujące wartości:
    ```
    REACT_APP_PEXELS_API_KEY=<twoj_api_key>
    REACT_APP_PEXELS_API_URL=https://api.pexels.com/v1/search
    ```

4. **Otwórz projekt** w dowolnym edytorze kodu (np. VS Code).

5. **Otwórz terminal** i przejdź do katalogu głównego projektu.

6. **Zainstaluj niezbędne paczki**:
    ```bash
    npm install
    ```

7. **Uruchom projekt**:
    ```bash
    npm start
    ```

## Opis

PexelsPhotoApp to aplikacja, która umożliwia wyszukiwanie obrazów zgodnie z Twoimi preferencjami. Oferuje zaawansowane możliwości filtrowania, w tym wybór tagów i kolorystyki. Dzięki dynamicznemu ładowaniu, obrazy pojawiają się automatycznie podczas przewijania listy miniaturek. Kliknięcie na miniaturkę powoduje wyświetlenie powiększonego zdjęcia na górze strony.

### Funkcje aplikacji:
- **Filtrowanie obrazów**: Wybieraj obrazy według tagów i kolorów w panelu filtrów na górze strony.
- **Dynamiczne ładowanie**: Obrazy są ładowane automatycznie, gdy przewijasz listę miniaturek.
- **Podgląd powiększenia**: Kliknij na miniaturkę, aby zobaczyć zdjęcie w pełnym rozmiarze.

---

Dzięki tym funkcjom, przeglądanie i wyszukiwanie obrazów jest szybkie, proste i intuicyjne. Ciesz się korzystaniem z PexelsPhotoApp!
