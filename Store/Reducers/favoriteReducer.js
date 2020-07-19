const initialState = { favoritesFilm: [] }

function toggleFavorite(state = initialState, action) {
    let nextState
    switch(action.type) {
        case 'TOGGLE_FAVORITE': // cas qui va permettre soit d'ajouter ou de supprimer un film des favoris
            const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id) // permet de vérifier si le film fait déjà partit de nos favoris avec la fonction JS "findIdex()"
            if (favoriteFilmIndex !== -1) { // cela signifi que le film est déjà présent dans les favoris
                //suppression dans les favoris
                nextState = {
                    ...state,
                    favoritesFilm: state.favoritesFilm.filter( (item, index) => index !== favoriteFilmIndex)
                }
            }
            else {
                // ajouter
                nextState = {
                    ...state,
                    favoritesFilm: [ ...state.favoritesFilm, action.value ]
                }

            }
            return nextState || state // ici on renvoit nextState si il ne vaut pas "undefined" sinon on renvoit state
            // cela permet également de garder une sécurité dans le cas où il se passerait un problème dans les switch case
            // De ce fait on pourrait quand même retourner des valeurs
        default:
            return state
    }
}

export default toggleFavorite