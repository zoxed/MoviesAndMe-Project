// Correspond à la fonction recherche de l'application
import React from "react"; // nécessaire pour créer un component custom
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  FlatList,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
/* stylesheet est une API qui permet d'augmenter les performance de l'application
en récupérant plus facilement l'identifiant du style externalisé 
et en l'appliquant plus rapidement */
import FilmItem from './FilmItem'
import FilmList from './FilmList'
import { getFilmsFromApiWithSeachedText } from '../API/TMDBApi'

class Search extends React.Component {

  constructor(props) {
    super(props)
    // Dans le state, on ne gère que des données qui, une fois modifiées, peuvent affecter le rendu de notre component.
    this.searchedText = "" // Le texte du TextInput ne modifie pas l'affichage de notre component, il n'a pas sa place dans le state.
    this.page = 0 // compteur pour connaitre la page courante
    this.totalPages = 0 // nombre de pages totales pour savoir si on a atteint a fin des retours de l'API TMDB
    this.state = { 
      films : [], // Nos films modifient l'affichage de notre component, ils ont donc leur place dans le state.
      isLoading: false,
    }
    this._loadFilms = this._loadFilms.bind(this)
  }

  _loadFilms () {
    if (this.searchedText.length > 0){
      this.setState({ isLoading: true}) // lancement du chargement
      getFilmsFromApiWithSeachedText(this.searchedText, this.page+1).then(data => {
        this.page = data.page
        this.totalPages = data.total_pages
        this.setState({
          // films : this.state.films.concat(data.resultats), 
          films : [...this.state.films, ...data.results], 
          /* la syntaxe des 3 petits points permet de créer une copie de l'objet. 
          On l'est à mis dans un tableau pour les concaténer
          On aurait pu utiliser cette syntaxe: this.state.films.concat(data.resultats),*/
          isLoading: false // arrêt du chargement
          // On mettant en commentaire ces deux élements, on peut voir apparaitre le chargement
          
        })
      })
    }
  }
  // fonction pour créer de l'affige optionnel (ici une affichage du chargement)
  _displayLoading() {
    if (this.state.isLoading){
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  // Fonction qui va permettre de supprimer la précédente recherche pour afficher la nouvelle
  _searchFilms() {
    this.page= 0
    this.totalPages = 0
    this.setState({
      films: []
    }, () => { 
      /* On place en second paramètre de setState un callback, c'est à dire une fonction 
      qui est appliqué lorsque setState à finit de mettre à zéro les films*/
      // console.log("Page: " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
      this._loadFilms()  
    })
  }

  _searchTextInputChanged(text) {
    this.searchedText = text
  }

  // fonction qui permet d'afficher les détails d'un film
  _displayDetailForFilm = (idFilm) => {
      // console.log("Display film with id "+ idFilm);
      this.props.navigation.navigate("FilmDetail", { idFilm: idFilm }) 
      /* la fonction navigate() peut prendre deux paramètre :
      1 : On met l'écran que l'on veut afficher dans le paramètre ici "FilmDetail"
      2 : On peut définir une liste de paramètre que l'on souhaite faire passer*/
  }

  render() {
    //la méthode render permet de rendre un élément graphique
    // console.log(this.state.isLoading)
    return (
      // <SafeAreaView style={styles.main_container}> 
      // {/* Dans cette application SafeAreaView n'est pas utile puisque React Navigation et son component StackNavigator en utilisent déjà un  */}
      //   {/* Ici on rend à l'écran les éléments graphiques de notre component custom Search */}
        <View style={styles.main_container}>
          <TextInput 
            onSubmitEditing={() => this._searchFilms()} 
            onChangeText={(text) => this._searchTextInputChanged(text)} 
            style={styles.TextInput} 
            placeholder="Titre du film" 
          />
          <Button title="Rechercher" onPress={() => this._searchFilms()} />
          {/* Les propriétés title et onPress sont obligatoire
                  Sinon l'application affiche un avertissement 
                  (ES6): onPress={() => {}} = onPress={function() {}}*/}

          {/* Flatlist avant de décomposer ce component avec un autre component qui rend l'affichage de liste */}
          {/* <FlatList // une flatList à un style flex: 1 par défaut. Pour le modifier il faut l'encapsuler dans une view
            data={this.state.films}
            extraData={this.props.favoritesFilm}
            keyExtractor={(item) => item.id.toString()} // la propriété key du keyExtractor doit être une chaîne de caractères
            onEndReachedThreshold = {0.5}
            onEndReached={() => {
              if (this.page < this.totalPages) { 
                //on va vérifier que la page sur laquelle on est n'a pas atteint le nombre total de page  de l'API pour la recherche donné
                this._loadFilms()
              }
            }}
            // renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm}/>}
            renderItem={({item}) =>
              <FilmItem
                film={item}
                // Ajout d'une props isFilmFavorite pour indiquer à l'item d'afficher un 🖤 ou non
                isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                displayDetailForFilm={this._displayDetailForFilm}
              />
            }
          /> */}
          <FilmList
            films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
            navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
            loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
            page={this.page}
            totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
            favoriteList={false} // Ici j'ai simplement ajouté un booléen à false pour indiquer qu'on n'est pas dans le cas de l'affichage de la liste des films favoris. Et ainsi pouvoir déclencher le chargement de plus de films lorsque l'utilisateur scrolle.
          />
          {this._displayLoading()} 
          {/* cette fonction est placé ici pour être sur qu'elle soit appelé en dernier 
          et que le chargement s'affiche s'affiche par dessus tous les élements graphiques.
          De plus, les fonctions appelées dans le render doivent obligatoirement retourner des éléments graphiques,
          auquel cas l'application plantera */}
        </View>
      // </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  TextInput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: "#000000",
    borderWidth: 1,
    paddingLeft: 5,
  },
  loading_container : {
    position: 'absolute', // permet de faire passer la vue du chargement par dessus l'écran
    left: 0,
    right: 0,
    top: 100, // permet d'éviter que la vue par par dessus le textInput et le button
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

// On export toujours un component par convention
// export default Search;

// Du coup on va passer la fonction connect dans le component qui traite l'affichage de la liste
// // On connecte le store Redux, ainsi que les films favoris du state de notre application, à notre component Search
// const mapStateToProps = state => {
//   return {
//     favoritesFilm: state.favoritesFilm
//   }
// }

// export default connect(mapStateToProps)(Search)

export default Search