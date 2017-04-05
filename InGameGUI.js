#pragma strict
import System.IO;

var guiMode : String = "InGame"; //String holding info in which state the game currently is.
var numActivated:int; //number of activated landingpads.
var totalLZ:int=2; //number of landingpads in the level.
var myGUI:GUISkin;
var winClip:AudioClip;
var loseClip:AudioClip;
var scoreText:GUIText;
var landingpadText:GUIText;
var totalScoreText:GUIText;
var levelScore:int;

var fuelMeter:GUITexture;
var fuelMeterStartingWidth:float;

var healthMeter:GUITexture;
var healthMeterStartingWidth:float;

var lander:PlayerController;
var DJplayer:DJ;
var gameInfo:GameInfo;

var pausedGameF:boolean=false;
var androidMode:boolean=false;

var ArrowPadLeft:GameObject;
var ArrowPadRight:GameObject;
var ArrowPadUp:GameObject;
var ArrowPadDown:GameObject;
var ButtonPause:GameObject;

var androidControlSetup:GameObject;
private var buttonWidth:int=Screen.width/6;
private var buttonHeight:int=Screen.height/6;

private var menuButtonW:int=Screen.width/3;
private var menuButtonH:int=Screen.height/8;
private var menuButtonSpace:int=Screen.height/16;

function Start()
{
	landingpadText.text="lvl "+Application.loadedLevel+" pads "+numActivated+"/"+totalLZ;
	//gets the width of fuel meter GUI texture
	//fuelMeterStartingWidth=fuelMeter.pixelInset.width;
	healthMeter.color=Color.green;
	fuelMeter.color=Color.green;
	lander=GameObject.FindWithTag("Lander").GetComponent(PlayerController);
	gameInfo=GameObject.FindWithTag("GameInfo").GetComponent(GameInfo);
	DJplayer=GameObject.FindWithTag("DJ").GetComponent(DJ);
	androidControlSetup=GameObject.FindWithTag("AndroidControlSetup");
	myGUI.button.fontSize=menuButtonH/2.7;
	scoreText.fontSize=menuButtonH/3;
	landingpadText.fontSize=menuButtonH/3;
	
	var tmp:int;
	tmp=System.Int32.Parse(currentLevelScore());
	scoreText.text="score - "+levelScore+"/"+tmp;
	if(androidMode){androidControlSetup.SetActive(true);} else {androidControlSetup.SetActive(false);}
}

function Update()
{
	if(Input.GetKeyDown("escape") || Input.GetButtonDown("Pause") || pausedGameF==true) //pressing "escape" pauses the game.
	{
		Time.timeScale = 0;
		guiMode = "Paused";
	}
}
function currentLevelScore()
{
	var levelPoints = new Array();
		levelPoints[1]="300";
		levelPoints[2]="600";
		levelPoints[3]="600";
		levelPoints[4]="1500";
		levelPoints[5]="300";
		levelPoints[6]="1200";
		levelPoints[7]="1200";
		levelPoints[8]="2100";
		levelPoints[9]="2400";
		levelPoints[10]="900";
		levelPoints[11]="600";
		levelPoints[12]="900";
		levelPoints[13]="1200";
		levelPoints[14]="1800";
		levelPoints[15]="1200";
		levelPoints[16]="2700";
		levelPoints[17]="1200";
		levelPoints[18]="1200";
		levelPoints[19]="1200";
		levelPoints[20]="1500";
		levelPoints[21]="2400";
		levelPoints[22]="3600";
		levelPoints[23]="5100";
		levelPoints[24]="9600";
		levelPoints[25]="9000";
		levelPoints[26]="9900";
		levelPoints[27]="12300";
	return levelPoints[Application.loadedLevel];
}
function PauseGame()
{
	Time.timeScale=0;
	guiMode="Paused";
	if(androidMode){androidControlSetup.SetActive(false);}
}

function OnGUI()
{
	GUI.skin=myGUI;
	
//	if(guiMode=="InGame" && androidMode==true)
//	{
//		if(GUI.Button(Rect(Screen.width-Screen.width/5,0,Screen.width/5,Screen.height/8), "Pause","InGameStyle"))
//		{
//			guiMode="Paused";
//			Time.timeScale=0;
//			androidControlSetup.SetActive(false);
//		}
//	}
	
	if(guiMode=="Paused")
	{
		if(GUI.Button(Rect(Screen.width/2-menuButtonW/2,Screen.height/2-2*menuButtonSpace-2*menuButtonH,menuButtonW,menuButtonH), "Resume Game","InGameStyle") || Input.GetKeyDown("return")|| Input.GetKeyDown("enter") || Input.GetButtonDown("NextResume") || Input.GetButtonDown("Pause"))
		{
			Time.timeScale = 1;
			guiMode="InGame";
			if(androidMode){androidControlSetup.SetActive(true);}
		}
		if(GUI.Button(Rect(Screen.width/2-menuButtonW/2,Screen.height/2-menuButtonSpace-menuButtonH,menuButtonW,menuButtonH), "Restart Level","InGameStyle") || Input.GetButtonDown("Restart"))
		{
			Time.timeScale = 1;
			guiMode="InGame";
			Application.LoadLevel(Application.loadedLevel);
		}
		if(PlayerPrefs.GetInt("Music")==1) 
		{
			if(GUI.Button(Rect(Screen.width/2-menuButtonW/2,Screen.height/2,menuButtonW,menuButtonH), "Turn Music On","InGameStyle"))
			{
			gameInfo.gameMusic=1;
			DJplayer.MusicPlay();
			}
		}
		if(PlayerPrefs.GetInt("Music")!=1) 
		{
			if(GUI.Button(Rect(Screen.width/2-menuButtonW/2,Screen.height/2,menuButtonW,menuButtonH), "Turn Music Off","InGameStyle"))
			{
			gameInfo.gameMusic=0;
			DJplayer.MusicStop();
			}
		}
		if(GUI.Button(Rect(Screen.width/2-menuButtonW/2,Screen.height/2+menuButtonSpace+menuButtonH,menuButtonW,menuButtonH),"Quit","InGameStyle") || Input.GetKeyDown("backspace") || Input.GetButtonDown("Restart"))
		{
			Time.timeScale = 1;
			gameInfo.WriteFile();
			Application.LoadLevel(0); //or Application.LoadLevel("MainMenu");
		}
	}
	if(guiMode=="Win")
	{
		if(GUI.Button(Rect(Screen.width/2-menuButtonW/2,Screen.height/2-2*menuButtonSpace-2*menuButtonH,menuButtonW,menuButtonH), "Next Level","InGameStyle") || Input.GetKeyDown("return") || Input.GetKeyDown("enter") || Input.GetButtonDown("NextResume"))
		{
			Time.timeScale = 1;
			gameInfo.WriteFile();
			guiMode="InGame";
			Application.LoadLevel(Application.loadedLevel+1);
		}
		if(GUI.Button(Rect(Screen.width/2-menuButtonW/2,Screen.height/2-menuButtonSpace-menuButtonH,menuButtonW,menuButtonH), "Replay Level","InGameStyle") || Input.GetButtonDown("Restart"))
		{
			Time.timeScale = 1;
			gameInfo.WriteFile();
			guiMode="InGame";
			Application.LoadLevel(Application.loadedLevel);
		}
		if(GUI.Button(Rect(Screen.width/2-menuButtonW/2,Screen.height/2,menuButtonW,menuButtonH), "Quit Game","InGameStyle") || Input.GetKeyDown("backspace") || Input.GetButtonDown("Quit"))
		{	
			Time.timeScale = 1;
			gameInfo.WriteFile();		
			Application.LoadLevel(0); //or Application.LoadLevel("MainMenu");
		}
	}
	if(guiMode=="Lose")
	{
		if(GUI.Button(Rect(Screen.width/2-menuButtonW/2,Screen.height/2-menuButtonSpace-menuButtonH,menuButtonW,menuButtonH), "Retry Level","InGameStyle") || Input.GetKeyDown("return") || Input.GetKeyDown("enter") || Input.GetButtonDown("Restart"))
		{
			Time.timeScale = 1;
			guiMode="InGame";
			gameInfo.WriteFile();
			Application.LoadLevel(Application.loadedLevel);
		}
		if(GUI.Button(Rect(Screen.width/2-menuButtonW/2,Screen.height/2,menuButtonW,menuButtonH), "Quit Game","InGameStyle") || Input.GetKeyDown("backspace") || Input.GetButtonDown("Quit"))
		{
			Time.timeScale = 1;
			gameInfo.WriteFile();
			Application.LoadLevel(0); //or Application.LoadLevel("MainMenu");
		}
	} 
}
function doubleScore()
{
	levelScore=2*levelScore;
	var tmp:int;
	tmp=System.Int32.Parse(currentLevelScore());
	scoreText.text="score - "+levelScore+"/"+tmp;
}
function LZActivated()
{
	if(gameInfo.difficulty==1)
	{
		levelScore+=100;
	}
	if(gameInfo.difficulty==2)
	{
		levelScore+=200;
	}
	if(gameInfo.difficulty==3)
	{
		levelScore+=300;
	}
	var tmp:int;
	tmp=System.Int32.Parse(currentLevelScore());
	scoreText.text="score - "+levelScore+"/"+tmp;
	numActivated++;
	landingpadText.text="lvl "+Application.loadedLevel+" pads "+numActivated+"/"+totalLZ;
	if(numActivated==totalLZ)
	{
		Win();
	}
}
function Win()
{
	lander.audioStop();
	audio.clip=winClip;
	audio.Play();
	Time.timeScale=0;
	guiMode="Win";
	//PlayerPrefs.SetInt("playerLevel",Application.loadedLevel); //quite useless
	var tmp:int;
	tmp=gameInfo.levelScore[Application.loadedLevel-1];
	if(tmp<levelScore) //kui salvestatud punktisumma väiksem uuest, salvestatakse üle uuega
	{
		gameInfo.levelScore[Application.loadedLevel-1]=levelScore;
	}
	gameInfo.WriteFile();
}
function Lose()
{
	Time.timeScale=1;
	lander.audioStop();
	//yield WaitForSeconds(1);
	audio.clip=loseClip;
	audio.Play();
	
	guiMode="Lose";
}

function UpdateFuelMeter(newFuelAmount:float) //kalkuleerib vastavalt uuele infole fuelMeter-i uue mõõdu ja värvi
{
	if (fuelMeterStartingWidth*(newFuelAmount*.01)<0)
	{
		fuelMeter.pixelInset.width=0;
		fuelMeter.color=Color.red;
	}
	else
	{
		fuelMeter.pixelInset.width=fuelMeterStartingWidth*(newFuelAmount*.01);
		fuelMeter.color=Color.Lerp(Color.red,Color.green,newFuelAmount*.01);
	}
}
function UpdateHealthMeter(newHealthAmount:float)  //kalkuleerib vastavalt uuele infole healthMeter-i uue mõõdu ja värvi
{	
	healthMeter.pixelInset.width=healthMeterStartingWidth*(newHealthAmount*.01);
	healthMeter.color=Color.Lerp(Color.red,Color.green,newHealthAmount*.01);
}