#pragma strict



@script ExecuteInEditMode() 
var guiMode : String = "Splash";

var myGUI:GUISkin;
var buttonWidth:int = 200;

var horizontalMove1:float = 2.5;
var horizontalMove2:float = 10;
var horizontalMove3:float = -5;
var verticalMove1:float = 2.2;
var verticalMove2:float = 6;
var verticalMove3:float = -7;

var landingPoints:int;
var landingPointsMax:int = 10200;
var surfacePoints:int;
var surfaceAccess:int = 5600;
var surfacePointsMax:int = 11700;
var underGroundAccess:int = 6400;
var underGroundPoints:int;
var underGroundPointsMax:int = 54600;

var warningText:GameObject;
var alreadyRunning:boolean=false;
var developerMode:boolean=false;
var GlvlNR:int;
var gameInfo:GameInfo;
var DJplayer:DJ;
var buttonStyle:GUIStyle;
private var menuButtonW:int=Screen.width/2.5;
private var menuButtonH:int=Screen.height/8;
private var menuButtonSpace:int=Screen.height/16;
private var tmp:int;
function Start()
{
	myGUI.button.fontSize=menuButtonH/2.7;
	
	gameInfo=GameObject.FindWithTag("GameInfo").GetComponent(GameInfo);
	alreadyRunning=gameInfo.alreadyRunning;
	DJplayer=GameObject.FindWithTag("DJ").GetComponent(DJ);
	DelayedStart();
}
function DelayedStart()
{
	yield WaitForSeconds(0.5);
	//gameInfo.ReadFile();
	if(gameInfo.devMode==0){developerMode=false;}else{developerMode=true;}
	if(gameInfo.gameMusic==0){DJplayer.MusicStop();}else{DJplayer.MusicPlay();}
}
function OnGUI()
{
	GUI.skin=myGUI;
	buttonStyle=GUI.skin.GetStyle("Locked"); buttonStyle.fontSize=menuButtonH/3;
	buttonStyle=GUI.skin.GetStyle("UnLocked"); buttonStyle.fontSize=menuButtonH/3;
	buttonStyle=GUI.skin.GetStyle("FolderLocked"); buttonStyle.fontSize=menuButtonH/3;
	buttonStyle=GUI.skin.GetStyle("LandingUnlocked"); buttonStyle.fontSize=menuButtonH/3;
	buttonStyle=GUI.skin.GetStyle("SurfaceUnlocked"); buttonStyle.fontSize=menuButtonH/3;
	buttonStyle=GUI.skin.GetStyle("underGroundUnlocked"); buttonStyle.fontSize=menuButtonH/3;
	buttonStyle=GUI.skin.GetStyle("InGameStyle"); buttonStyle.fontSize=menuButtonH/3;

	if(guiMode=="Main" && !alreadyRunning)
	{
		if(GUI.Button(Rect(0,0,Screen.width,Screen.height), "","SplashScreen"))
		{
//			guiMode="Main";
			alreadyRunning=true;
			gameInfo.alreadyRunning=true;
		}
	}	
	if(guiMode=="Main" && alreadyRunning)
	{
		if(GUI.Button(Rect(Screen.width/2-menuButtonW/2,Screen.height/2-menuButtonH-2*menuButtonSpace,menuButtonW,menuButtonH), "New Game"))
		{
			guiMode="NewGameWarning";
		}
		tmp=gameInfo.levelScore[0];
		if(tmp>0) //checks if a level is saved.
		{
			if(GUI.Button(Rect(Screen.width/2-menuButtonW/2,Screen.height/2-3*menuButtonSpace-2*menuButtonH,menuButtonW,menuButtonH), "Continue Game"))
			{
				ScoreCounter();
				guiMode="LevelSelect";
			}
		}
		if(GUI.Button(Rect(Screen.width/2-menuButtonW/2,Screen.height/2-menuButtonSpace,menuButtonW,menuButtonH), "Options"))
		{
			guiMode="Options";
		}
		if(GUI.Button(Rect(Screen.width/2-menuButtonW/2,Screen.height/2+menuButtonH,menuButtonW,menuButtonH), "Help"))
		{
			guiMode="Help1";
		}
		if(GUI.Button(Rect(Screen.width/2-menuButtonW/2,Screen.height/2+menuButtonSpace+2*menuButtonH,menuButtonW,menuButtonH), "Quit") || Input.GetKeyDown("escape"))
		{
			Application.Quit(); //closes app
		}
		


	}
	if(guiMode=="Options")
	{
		if(gameInfo.gameMusic==0) 
		{
			if(GUI.Button(Rect(Screen.width/2-menuButtonW/2,Screen.height/2-2*menuButtonSpace-2*menuButtonH,menuButtonW,menuButtonH), "Turn Music On"))
			{
			gameInfo.gameMusic=1;
			DJplayer.MusicPlay();
			}
		}
		if(gameInfo.gameMusic==1) 
		{
			if(GUI.Button(Rect(Screen.width/2-menuButtonW/2,Screen.height/2-2*menuButtonSpace-2*menuButtonH,menuButtonW,menuButtonH), "Turn Music Off"))
			{
			gameInfo.gameMusic=0;
			DJplayer.MusicStop();
			}
		}
//		if(!developerMode) 
//		{
//			if(GUI.Button(Rect(Screen.width/2-menuButtonW/2,Screen.height/2-menuButtonSpace-menuButtonH,menuButtonW,menuButtonH), "Turn DM On"))
//			{
//			gameInfo.devMode=1;
//			developerMode=true;
//			}
//		}
//		if(developerMode)
//		{
//			if(GUI.Button(Rect(Screen.width/2-menuButtonW/2,Screen.height/2-menuButtonSpace-menuButtonH,menuButtonW,menuButtonH), "Turn DM Off"))
//			{
//			gameInfo.devMode=0;
//			developerMode=false;
//			}
//		}
		if(GUI.Button(Rect(menuButtonSpace,Screen.height-menuButtonH,menuButtonW/2,menuButtonH), "Back"))
		{
			gameInfo.WriteFile();
			guiMode="Main";
		}		
	}
	if(guiMode=="NewGameWarning")
	{
		warningText.guiText.fontSize=menuButtonH/2.7;
		warningText.guiText.text="All progress will be lost. Continue?";
		if(GUI.Button(Rect(Screen.width/2-menuButtonW/2,Screen.height/2,menuButtonW/2,menuButtonH), "Yes"))
		{
			warningText.guiText.text=" ";
			gameInfo.DeleteSaveGame();
			ScoreCounter();
			guiMode="LevelSelect"; //level-browser starts
		}
		if(GUI.Button(Rect(Screen.width/2,Screen.height/2,menuButtonW/2,menuButtonH), "No"))
		{
			warningText.guiText.text=" ";
			guiMode="Main";
		}
	}
	if(guiMode=="Help1")
	{
		if(GUI.Button(Rect(Screen.width/2-Screen.width/2.1,Screen.height/2-Screen.height/2.1,Screen.width/1.05,Screen.height/1.1), "","Help1"))
		{
			
		}

		if(GUI.Button(Rect(menuButtonSpace,Screen.height-menuButtonH,menuButtonW/2,menuButtonH), "Back"))
		{
			guiMode="Main";
		}

		if(GUI.Button(Rect(Screen.width-menuButtonSpace-menuButtonW/2,Screen.height-menuButtonH,menuButtonW/2,menuButtonH), "Next"))
		{
			guiMode="Help2";
		}		
	}
	if(guiMode=="Help2")
	{
		if(GUI.Button(Rect(Screen.width/2-Screen.width/2.1,Screen.height/2-Screen.height/2.1,Screen.width/1.05,Screen.height/1.1), "","Help2"))
		{
			
		}

		if(GUI.Button(Rect(menuButtonSpace,Screen.height-menuButtonH,menuButtonW/2,menuButtonH), "Back"))
		{
			guiMode="Main";
		}

		if(GUI.Button(Rect(Screen.width-menuButtonSpace-menuButtonW/2,Screen.height-menuButtonH,menuButtonW/2,menuButtonH), "Next"))
		{
			guiMode="Help3";
		}		
	}
	if(guiMode=="Help3")
	{
		if(GUI.Button(Rect(Screen.width/2-Screen.width/2.1,Screen.height/2-Screen.height/2.1,Screen.width/1.05,Screen.height/1.1), "","Help3"))
		{
			
		}

		if(GUI.Button(Rect(menuButtonSpace,Screen.height-menuButtonH,menuButtonW/2,menuButtonH), "Back"))
		{
			guiMode="Main";
		}		
	}

	if(guiMode=="LevelSelect1")
	{
		levelSelectionButton(horizontalMove1, verticalMove1, 5, 1);
		levelSelectionButton(horizontalMove2, verticalMove1, 5, 2);
		levelSelectionButton(horizontalMove3, verticalMove1, 5, 3);
		levelSelectionButton(horizontalMove1, verticalMove2, 5, 4);
		levelSelectionButton(horizontalMove2, verticalMove2, 5, 5);
		levelSelectionButton(horizontalMove3, verticalMove2, 5, 6);
		levelSelectionButton(horizontalMove1, verticalMove3, 5, 7);
		levelSelectionButton(horizontalMove2, verticalMove3, 5, 8);
		levelSelectionButton(horizontalMove3, verticalMove3, 5, 9);
		if(GUI.Button(Rect(menuButtonSpace,Screen.height-menuButtonH,menuButtonW/2,menuButtonH), "Back"))
		{
			guiMode="LevelSelect";
		}

	}
	if(guiMode=="LevelSelect2")
	{
		levelSelectionButton(horizontalMove1, verticalMove1, 5, 10);
		levelSelectionButton(horizontalMove2, verticalMove1, 5, 11);
		levelSelectionButton(horizontalMove3, verticalMove1, 5, 12);
		levelSelectionButton(horizontalMove1, verticalMove2, 5, 13);
		levelSelectionButton(horizontalMove2, verticalMove2, 5, 14);
		levelSelectionButton(horizontalMove3, verticalMove2, 5, 15);
		levelSelectionButton(horizontalMove1, verticalMove3, 5, 16);
		levelSelectionButton(horizontalMove2, verticalMove3, 5, 17);
		levelSelectionButton(horizontalMove3, verticalMove3, 5, 18);
		if(GUI.Button(Rect(menuButtonSpace,Screen.height-menuButtonH,menuButtonW/2,menuButtonH), "Back"))
		{
			guiMode="LevelSelect";
		}

	}
	if(guiMode=="LevelSelect3")
	{
		levelSelectionButton(horizontalMove1, verticalMove1, 5, 19);
		levelSelectionButton(horizontalMove2, verticalMove1, 5, 20);
		levelSelectionButton(horizontalMove3, verticalMove1, 5, 21);
		levelSelectionButton(horizontalMove1, verticalMove2, 5, 22);
		levelSelectionButton(horizontalMove2, verticalMove2, 5, 23);
		levelSelectionButton(horizontalMove3, verticalMove2, 5, 24);
		levelSelectionButton(horizontalMove1, verticalMove3, 5, 25);
		levelSelectionButton(horizontalMove2, verticalMove3, 5, 26);
		levelSelectionButton(horizontalMove3, verticalMove3, 5, 27);
		if(GUI.Button(Rect(menuButtonSpace,Screen.height-menuButtonH,menuButtonW/2,menuButtonH), "Back"))
		{
			guiMode="LevelSelect";
		}

	}

	if (guiMode=="LevelSelect")
	{
		if(GUI.Button(Rect(menuButtonSpace,Screen.height-menuButtonH,menuButtonW/2,menuButtonH), "Back"))
		{
			guiMode="Main";
		}


		if(GUI.Button(Rect(Screen.width/2-Screen.width/2.3,Screen.height/2-Screen.height/2.1,Screen.width/4,Screen.height/1.2), "Landing\n\n"+gameInfo.landingPoints+"/"+landingPointsMax,"LandingUnLocked"))
			{
			guiMode="LevelSelect1";
			}
			
		if(PlayerPrefs.GetInt("LVL9")!=0  || developerMode==true)
		{
			if(GUI.Button(Rect(Screen.width/2-Screen.width/8.1,Screen.height/2-Screen.height/2.1,Screen.width/4,Screen.height/1.2), "Surface\n\n"+gameInfo.surfacePoints+"/"+surfacePointsMax,"SurfaceUnLocked"))
			{
			guiMode="LevelSelect2";
			}
		}
		else
		{
			if(GUI.Button(Rect(Screen.width/2-Screen.width/8.1,Screen.height/2-Screen.height/2.1,Screen.width/4,Screen.height/1.2), "Surface\n\n","FolderLocked")){}
		}
		if(PlayerPrefs.GetInt("LVL18")!=0  || developerMode==true)
		{
			if(GUI.Button(Rect(Screen.width/2+Screen.width/5.3,Screen.height/2-Screen.height/2.1,Screen.width/4,Screen.height/1.2), "UnderGround\n\n"+gameInfo.undergroundPoints+"/"+underGroundPointsMax,"underGroundUnLocked"))
			{
			guiMode="LevelSelect3";
			}
		}
		else
		{
			if(GUI.Button(Rect(Screen.width/2+Screen.width/5.3,Screen.height/2-Screen.height/2.1,Screen.width/4,Screen.height/1.2), "UnderGround\n\n","FolderLocked")){}
		}
	}
	if(guiMode=="difficulty")
	{
		if(GUI.Button(Rect(Screen.width/2-menuButtonW/2,Screen.height/2-2*menuButtonSpace-menuButtonH,menuButtonW,menuButtonH), "Easy"))
		{
			gameInfo.difficulty=1;
			gameInfo.WriteFile();
			guiMode="InGame";
			Application.LoadLevel(GlvlNR);
		}
		if(GUI.Button(Rect(Screen.width/2-menuButtonW/2,Screen.height/2-menuButtonSpace,menuButtonW,menuButtonH), "Normal"))
		{
			gameInfo.difficulty=2;
			gameInfo.WriteFile();

			guiMode="InGame";
			Application.LoadLevel(GlvlNR);
		}
		if(GUI.Button(Rect(Screen.width/2-menuButtonW/2,Screen.height/2+menuButtonH,menuButtonW,menuButtonH), "Hard"))
		{
			gameInfo.difficulty=3;
			gameInfo.WriteFile();
			guiMode="InGame";
			Application.LoadLevel(GlvlNR);
			}
		if(GUI.Button(Rect(menuButtonSpace,Screen.height-menuButtonH,menuButtonW/2,menuButtonH), "Back"))
		{
			guiMode="LevelSelect";
		}
	}

}
function levelSelectionButton(HMove:float, VMove:float, size:int, lvlNR:int)
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

		var tmp:int;
		if(lvlNR<2){tmp=2;}else{tmp=lvlNR;}
		if(gameInfo.levelScore[tmp-2]!=0 || lvlNR==1 || developerMode==true)
		{
			if(GUI.Button(Rect(Screen.width/2-Screen.width/HMove,Screen.height/2-Screen.height/VMove,Screen.width/size,Screen.height/size), "LVL "+lvlNR+"\n\n"+gameInfo.levelScore[lvlNR-1]+"/"+levelPoints[lvlNR],"UnLocked")) //"PlayedStyle"
			{
				Time.timeScale = 1;
				GlvlNR=lvlNR;
				guiMode="difficulty";
			}
		}
		else
		{
			if(GUI.Button(Rect(Screen.width/2-Screen.width/HMove,Screen.height/2-Screen.height/VMove,Screen.width/size,Screen.height/size), "LVL "+lvlNR+"\n\n","Locked")){}
		}		
}	
function ScoreCounter()
{
	var sum:int;
	var tmp:int;
	for(var i=0;i<9;i++)
	{
		tmp=gameInfo.levelScore[i]; //PlayerPrefs.GetInt("LVL"+(i+1));
		sum+=tmp;
	}
	gameInfo.landingPoints=sum; //PlayerPrefs.SetInt("Landing",sum);
	Debug.Log(gameInfo.landingPoints);
	sum=0;
	for(var j=9;j<18;j++)
	{
		tmp=gameInfo.levelScore[j];  //PlayerPrefs.GetInt("LVL"+(j+1));
		sum+=tmp;
	}
	gameInfo.surfacePoints=sum;  //PlayerPrefs.SetInt("Surface",sum);
	sum=0;
	for(var k=18;k<27;k++)
	{
		tmp=gameInfo.levelScore[k]; //PlayerPrefs.GetInt("LVL"+(k+1));
		sum+=tmp;
	}
	gameInfo.undergroundPoints=sum; //PlayerPrefs.SetInt("UnderGround",sum);
	sum=0;
	gameInfo.WriteFile();
}	
