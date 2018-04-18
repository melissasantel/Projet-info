 import { StyleSheet } from 'react-native'; 

export const styles = StyleSheet.create ({
    //Page de paramètre
    inputParameters:{
        borderBottomWidth: 1,
        height: 20,
        marginBottom:30,
        borderBottomColor:'transparent',
        color: '#A9A9A9',
        paddingHorizontal: 10,
        fontSize : 14,
        paddingLeft:10,
    },
    setUpContainer:{
        flexDirection :'row',
        backgroundColor:'#fff',
        borderBottomColor:'#A9A9A9',
        borderColor:'transparent',
        borderWidth:1,
        paddingLeft:10,
        paddingTop:14, 
        paddingBottom:16,
    },
    lblSetUp:{
        fontWeight:'bold', 
         
    },
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
    btnValContainer:{
        flexDirection:'row',
        justifyContent: 'flex-end'
    },
    imagePage:{
        width:300,
        height:200,
        paddingBottom:20,
    },
    btnPickPage:{
        borderRadius :30,
        padding: 3,
        borderColor : '#A9A9A9',
        marginBottom: 10,
        borderWidth:1, 
        overflow: 'hidden',
    },
    imagePageContainer:{
        justifyContent:'center',
        alignItems:'center',
    },
    couvertureContainer:{
        flexDirection:'column',
        marginBottom:10,
    }, 
    PickContainer:{
        flexDirection:'row',
        //alignItems : 'center',
        //justifyContent:'space-between',
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
    iconCarnet:{
        paddingRight:30,
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
        marginRight : 10,
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
    btnCarnet:{
        paddingTop : 10,
    },
    
    couvCarnet:{
        width:100,
        height: 100,
    },
    infoCarnetContainer:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'flex-start',
        
    },
    CarnetDescrText:{
        paddingTop:10,
        paddingBottom:5,
        textAlign : 'left',
    },
    pagesCarnet:{
        alignItems:'center',
        justifyContent:'flex-end',
        fontSize:11,
    },
    btnTextCarnet:{
        color: '#66CDAA',
        textAlign: 'center',
        fontWeight: '700',
        fontSize : 14,
    },
    //page post 
    
    inputPost:{
        borderBottomWidth: 1,
        borderColor : '#A9A9A9',
        height: 20,
        width:250,  
        marginBottom:10,
        color: 'black',
        paddingHorizontal: 10,
        fontSize : 14,
        marginTop:20,
        
    },
    imageLegendeCont:{
        flexDirection:'row',
        justifyContent:'flex-start',
        paddingBottom:16,
    },
    labelPost:{
        fontWeight: '700',
        fontSize : 14,
        paddingTop: 20,
        paddingBottom:10,
    },
    iconPage:{
        paddingTop:20,
        paddingLeft:10,
        paddingBottom:10,
    },
    weatherStyle:{
        paddingTop:20,
        paddingLeft:10,
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
    titreDateContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'start',
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
        paddingBottom: 5,
        //paddingRight:130,
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
        paddingVertical: 30
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
    paramContainer:{
        jutifyContent:'row',
        alignItems:'flex-end',
    },
    
    trashContainer:{
        alignItems:'flex-end',
        marginBottom:10,
    },
    infoContainer:{
        backgroundColor:'#fff',
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
    couverturePicker:{
        height: 100, 
        width: 100, 
        borderRadius: 45, 
        overflow: 'hidden'
    },
    profilPictureBorder: {
        borderWidth: 1,
        borderColor: '#A9A9A9', 
        height: 100, 
        width: 100, 
        borderRadius: 55, 
        overflow: 'hidden'
    },
    affichageContainer:{
        backgroundColor:'#fff',
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
        borderRightColor : '#A9A9A9',
        borderColor:'#fff',
        backgroundColor:'#fff',
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
    nameparaContainer:{
        alignItems:'center',
        paddingBottom:10,
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
