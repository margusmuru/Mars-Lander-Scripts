#pragma strict

DontDestroyOnLoad(gameObject); //object wont get destroyd when changing the scenes
//loads up to the new scene
var myLifeTime:int=0; //object lifetime counter
var musicTracks:AudioClip[];
var currentTrack:int;

function Awake() //destroy old gameinfo
{
	var allDJs=GameObject.FindGameObjectsWithTag("DJ"); //array of objects with tag "gameinfo"
	if(allDJs.length>1) //if there is
	{
		for(theDJ in allDJs) //all objects in array
		{
			if(theDJ.GetComponent(DJ).myLifeTime > myLifeTime) //if objects lifetime is greater than current objects
			{
				Destroy(gameObject); //destroy newer object
			}
		}
	}
}

function Start () 
{
	myLifeTime++;
	audio.clip=musicTracks[0];
	audio.Stop();
}

function Update () 
{
	if(!audio.isPlaying && PlayerPrefs.GetInt("Music")!=1)  //music player. repeats playlist.
	{
		if(currentTrack==musicTracks.length-1)
		{
			audio.clip=musicTracks[0];
			currentTrack=0;
			//audio.Play();
		}
		else
		{
			currentTrack++;
			audio.clip=musicTracks[currentTrack];
			//audio.Play();
		}
	}
}
function MusicStop()
{
	audio.Stop();
}
function MusicPlay()
{
	audio.Play();
}