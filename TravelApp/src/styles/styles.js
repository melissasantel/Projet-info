 import { StyleSheet } from 'react-native'; 

export const styles = StyleSheet.create ({
    //Page de paramètre
    buttonParameter:{
        padding: 10,
        borderBottomColor : '#A9A9A9',
        borderColor:'transparent',
        marginBottom: 2,
        borderWidth:1, 
        overflow: 'hidden',

    },
    buttonParameterText:{
        textAlign:'left',
        color:'#696969',
    },
    //page de carnet de voyage
    couvertureContainer:{
        flexDirection:'row',
        marginBottom:10,
    }, 
    couverturePicker:{
        width: 100,
        height:100,
    },
    PickContainer:{
        flexDirection:'row'
    },
    btnPick:{
        alignItems:'flex-end',
        borderRadius :30,
        padding: 3,
        borderColor : '#A9A9A9',
        marginBottom: 10,
        borderWidth:1, 
        overflow: 'hidden',
    },
    label:{
        marginBottom: 10,
        color:'#66CDAA',
        fontWeight: '700',
        fontSize : 14,
        paddingRight :40,
    }, 
    inputCarnet:{
        borderBottomWidth: 1,
        borderColor : '#A9A9A9',
        height: 20,
        marginBottom:30,
        color: '#A9A9A9',
        paddingHorizontal: 10,
        fontSize : 14
    },
    btnCreerContainer:{
        backgroundColor:'#FFF',
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'flex-end',
        
    },
    logoAjoutCarnet:{
        width : 15, 
        height : 15, 
        marginLeft : 5,
    },
    btnCreer:{
        textAlign:'center',
        paddingLeft : 10,
        fontSize:15,
        marginTop: 10,
        marginRight : 5,
    },
    informationContainer:{
        alignItems:'center', 
        paddingTop : 20, 
        justifyContent: 'center',
    },
    informationMessage: {
        textAlign:'center',
        marginTop:10,
        marginBottom: 30, 
        fontSize : 18,
        fontWeight: '700',
    },
    listCarnetContainer:{
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'#fff',
        borderBottomColor:'#A9A9A9',
        borderColor:'transparent',
        borderWidth:1,
        paddingTop:14, 
        paddingBottom:16
    },
    carnetCouvContainer:{
        marginTop: 5,
        marginBottom : 10,
        marginRight:10,
        paddingLeft:10,
    },
    couvCarnet:{
        width:100,
        height: 100,
    },
    infoCarnetContainer:{
        flexDirection:'column',
        
    },
    CarnetDescrText:{
        textAlign : 'center',
        paddingRight : 75, 
        paddingLeft : 5,
    },
    pagesCarnet:{
        alignItems:'center',
        justifyContent:'flex-end',
        
        //paddingTop:15,
        //paddingLeft:60,
        fontSize:11,
    },
    //Post acceuil 
    postContainer:{
        backgroundColor:'#fff',
        borderBottomColor:'#A9A9A9',
        borderColor:'transparent',
        borderWidth:1,
        paddingLeft:10,
        paddingTop:14, 
        paddingBottom:16,
    },
    postPhotoContainer:{
        alignItems:'center', 
        marginTop: 5,
        marginBottom : 10,
        marginRight:16,
    
    },
    photoPost:{
        width:300,
        height: 350,
    }, 
    postTitle:{
        color: '#66CDAA',
        fontWeight: '700',
        fontSize : 16,
        paddingBottom: 20,
    },
    postText:{
        fontWeight: '700',
        fontSize : 14,
        paddingTop: 20,
    },
    likeComment:{
        flexDirection:'row', 
        alignItems: "center",
    },
    comment:{
        marginLeft:20,
    },

    //ScrollVview
    contentContainer:{
        paddingVertical: 20
    },

    //Loggin et Signin
    container: {
      flex:1,
      backgroundColor: '#FFF'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        marginTop: 5,
        width:100,
        height:100
    }, 
    title:{
      color: '#66CDAA',
      marginTop:10,
      marginBottom: 30,
      width : 160, 
      textAlign: 'center',
      opacity: 0.8,
      fontSize : 26,
      fontFamily : 'Courier'
    },
    container: {
        padding: 10,
    },
    input: {
        borderBottomWidth: 1,
        borderColor : '#66CDAA',
        height: 20,
        marginBottom:40,
        color: '#66CDAA',
        paddingHorizontal: 5,
        fontSize : 14
    },
    buttonLogIn:{
        padding: 10,
        borderColor : '#A9A9A9',
        marginBottom: 10,
        borderWidth:1, 
        overflow: 'hidden',
        borderRadius : 20
    },
    buttonRegister: {
        padding:10,
        marginBottom : 10
    },
    buttonTextLogIn: {
        color: '#66CDAA',
        textAlign: 'center',
        fontWeight: '700',
        fontSize : 14,
    },
    buttonTextRegister: {
        color: '#A9A9A9',
        textAlign: 'center',
        fontWeight: '700',
        fontSize : 14,
    }, 
    errorText: {
    fontSize : 14,
    textAlign: 'center', 
    color: '#F08080'
    },

    // page de photos
    logoImage: {
        marginTop: 60,
        width:100,
        height:100
    }, 
    imagePickerContainer:{
        alignItems:'center', 
        marginTop: 60,
        marginBottom : 10,
    },
    imagePicker: {

        width: 300, 
        height: 300, 
    }, 
    buttonImageContainer:{
        
        flexDirection:'column',
        justifyContent:'center',
    
    },
    buttonImage: {
        padding:10,
        backgroundColor : '#FFF',
        marginTop :20
     
    },
    buttonTextImage: {
        color: '#66CDAA',
        textAlign: 'center',
        fontWeight: '700',
        fontSize : 16,
    },
    btnPostContainer:{
        flexDirection:'row',
        justifyContent: 'space-between',
        
    },
    btnPost:{
        padding:10,
        marginTop : 20,
    },
    btnTextPost:{
        color: '#A9A9A9',
        textAlign: 'center',
        fontWeight: '700',
        fontSize : 14,
    },

    //Profil utilisateur
    infoContainer:{
        borderBottomColor:'#A9A9A9',
        borderColor:'transparent',
        borderWidth:1,
        paddingLeft:10,
        paddingBottom:16,
    },
    ButtonParametersCont:{
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'flex-end',
        marginTop: 20,
    },
    buttonParam:{ 
        marginRight: 5,
        overflow: 'hidden',
        borderRadius : 3
    },
    profilPictureBorder: {
        borderWidth: 1,
        borderColor: '#A9A9A9', 
        height: 110, 
        width: 110, 
        borderRadius: 55, 
        overflow: 'hidden'
    },
    affichageContainer:{
        flexDirection:'row', 
        alignItems: 'center',
        justifyContent:'center',
        borderBottomColor:'#A9A9A9',
        borderColor:'transparent',
        borderWidth:1,
    },
    btnGalerieProfil:{
        padding: 10,
        paddingRight :30, 
        paddingLeft :30,
        //backgroundColor:'#A9A9A9',
        borderRightColor : '#A9A9A9',
        borderColor:'transparent',
        marginTop: 2,
        borderWidth:1, 
        overflow: 'hidden',
    },
    btnCarnetProfil:{
        padding: 10,
        paddingRight :30, 
        paddingLeft :30,
        borderLeftColor : '#A9A9A9',
        borderColor:'transparent',
        marginTop: 2,
        borderWidth:1, 
        overflow: 'hidden',
    },
    profilPicture: {
        alignItems:'center', 
        marginTop: 10,
        marginBottom : 10,

    }, 
    description: {
        alignItems: 'center',

    },
    nameText: {
        fontSize : 20,
        color : '#66CDAA'
    },
    descriptionText: {
        fontSize: 14,
        alignItems: 'center',
        marginBottom: 10,
        paddingRight : 35, 
        paddingLeft : 35, 
    }

})
