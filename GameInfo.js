#pragma strict
import System.IO;
var filePath:String;
var alreadyRunning:boolean=false;
//SaveGame variables
var devMode:int;
var gameMusic:int=1;
var difficulty:int;
var landingPoints:int;
var surfacePoints:int;
var undergroundPoints:int;
var levelScore=new Array();
//end

DontDestroyOnLoad(gameObject); //object wont get destroyd when changing the scenes 
//loads up to the new scene
var myLifeTime:int=0; //object lifetime counter

function Awake() //destroy old gameinfo
{
	var allGI=GameObject.FindGameObjectsWithTag("GameInfo"); //array of objects with tag "gameinfo"
	if(allGI.length>1) //if there is
	{
		for(theGI in allGI) //all objects in array
		{
			if(theGI.GetComponent(GameInfo).myLifeTime > myLifeTime){Destroy(gameObject);/*newer gets destroyed*/}
		}
	}
}

function Start()
{
	//print (Application.persistentDataPath);
	filePath= Application.persistentDataPath+"/saveGame.dat";
	for(var i=0;i<27;i++)
	{
		levelScore[i]=0;
	}
	ReadFile();
	DelayedStart();
}
function DelayedStart()
{
//	yield WaitForSeconds(5);
//	alreadyRunning=true;
}
function Update() {
}
 
function DeleteSaveGame()
{
    var sw : StreamWriter = new StreamWriter(filePath);
    sw.WriteLine("devMode="+devMode);
    sw.WriteLine("gameMusic="+gameMusic);
    sw.WriteLine("difficulty="+difficulty);
	sw.WriteLine("landingPoints="+landingPoints);
	sw.WriteLine("surfacePoints="+surfacePoints);
	sw.WriteLine("undergroundPoints="+undergroundPoints);
	for(var i=0;i<27;i++)
	{
		sw.WriteLine("levelScore["+i+"]=0");
	}
    sw.Flush();
    sw.Close();
	ReadFile();
}
function WriteFile()
{
    var sw : StreamWriter = new StreamWriter(filePath);
    sw.WriteLine("devMode="+devMode);
    sw.WriteLine("gameMusic="+gameMusic);
    sw.WriteLine("difficulty="+difficulty);
	sw.WriteLine("landingPoints="+landingPoints);
	sw.WriteLine("surfacePoints="+surfacePoints);
	sw.WriteLine("undergroundPoints="+undergroundPoints);
	for(var i=0;i<27;i++)
	{
		sw.WriteLine("levelScore["+i+"]="+levelScore[i]);
	}
    sw.Flush();
    sw.Close();
}
 

function ReadFile() 
{    
    var itemName:String;
    var itemValue:int;
    var names=new Array();
   
    try {
    	var sr = new File.OpenText(filePath);
	    var input:String = "";
    	while (true) 
    	{
    	    input = sr.ReadLine();
        	if (input == null) 
        	{
        		break;
        	}
        	//Debug.Log("line="+input);
        	names=input.Split("="[0]);
			if(names[0]=="devMode"){devMode=System.Int32.Parse(names[1]);/*Debug.Log("developer mode = "+devMode);*/}
			if(names[0]=="gameMusic"){gameMusic=System.Int32.Parse(names[1]);/*Debug.Log("game music = "+gameMusic);*/}
			if(names[0]=="difficulty"){difficulty=System.Int32.Parse(names[1]);/*Debug.Log("difficulty = "+difficulty);*/}
			if(names[0]=="landingPoints"){landingPoints=System.Int32.Parse(names[1]);/*Debug.Log("landingPoints = "+landingPoints);*/}
        	if(names[0]=="surfacePoints"){surfacePoints=System.Int32.Parse(names[1]);/*Debug.Log("surface = "+surfacePoints);*/}
			if(names[0]=="undergroundPoints"){undergroundPoints=System.Int32.Parse(names[1]);/*Debug.Log("undergroundPoints = "+undergroundPoints);*/}
			for(var i=0;i<27;i++)
			{
				if(names[0]==("levelScore["+i+"]")){levelScore[i]=System.Int32.Parse(names[1]);/*Debug.Log("levelScore["+i+"]="+levelScore[i]);*/}
			}
    	}
    	sr.Close();
    }
    catch (e)
    {
    	print(e.Message);
    }
}
