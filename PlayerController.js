#pragma strict

var topThruster:ParticleEmitter;
var mainThruster:ParticleEmitter;
var leftThruster:ParticleEmitter;
var rightThruster:ParticleEmitter;

var crashSounder:GameObject;
var moveUpForce : float = 10;
var moveDownForce : float = 10;
var moveForce : float = 10;
var explodeForce : float = 2;

var shipExplosions:GameObject[];

var fuelBurnSpeed:float;
var haveFuel:boolean;
var fuelAmount:float;

var haveHealth:boolean;
var healthAmount:float;
var damageMultiply:float=1;

var shieldActive:boolean = false;
var lightSource:GameObject;
var shield:GameObject;
var GUI : InGameGUI; //GUI scripti slot.
var gameInfo:GameInfo;

var moveUpF:boolean=false;
var moveDownF:boolean=false;
var moveLeftF:boolean=false;
var moveRightF:boolean=false;
function Start () 
{
	//yield(WaitForSeconds(5));
	//Explode();
	GUI=GameObject.FindWithTag("GUI").GetComponent(InGameGUI); 
	gameInfo=GameObject.FindWithTag("GameInfo").GetComponent(GameInfo);
}

function FixedUpdate () 
{	
	if(transform.position.y < -20) //killzone for falling lander
	{
		Explode();
	}
	//if (androidMode==true && leftThruster.emit==false && rightThruster.emit==false && topThruster.emit==false && mainThruster.emit==false){audioStop();}
	if(haveFuel==true)
	{	
		if(Input.GetAxis("Horizontal")>0 || moveRightF==true) // checking for right arrow key
		{
			leftThruster.emit=true;
			rightThruster.emit=false;
			rigidbody.AddForce(moveForce,0,0);
		}

		if(Input.GetAxis("Horizontal")<0 || moveLeftF==true) // checking for left arrow key
		{
			rightThruster.emit=true;
			leftThruster.emit=false;
			rigidbody.AddForce(-moveForce,0,0);	
		}
		
		if(Input.GetAxis("Horizontal")==0 && moveLeftF==false && moveRightF==false) // checking if no key is pressed
		{
			leftThruster.emit=false;
			rightThruster.emit=false;
		}
	
		if(Input.GetAxis("Vertical")>0 || moveUpF==true) // checking for up arrow key
		{
			mainThruster.emit=true;
			topThruster.emit=false;
			rigidbody.AddForce(0,moveUpForce,0);
	
		}
		if(Input.GetAxis("Vertical")<0 || moveDownF==true) // checking for down arrow key
		{
			topThruster.emit=true;
			mainThruster.emit=false;
			rigidbody.AddForce(0,-moveForce,0);
		}
		if(Input.GetAxis("Vertical")==0 && moveUpF==false && moveDownF==false) // checking if no key is pressed
		{
			mainThruster.emit=false;
			topThruster.emit=false;
			rigidbody.AddForce(0,-moveDownForce,0);
	
		}
		if(Input.GetAxis("Vertical")!=0 || Input.GetAxis("Horizontal")!=0 || moveUpF==true || moveDownF==true || moveLeftF==true || moveRightF==true)
		{
			if(!audio.isPlaying)
			{
				audio.Play();	
			}
			fuelAmount-=(fuelBurnSpeed*Time.deltaTime); //remove fuel fuelburnspeed per second
			
			if(fuelAmount <=0) // if no fuel left
			{
				fuelAmount=0;
				haveFuel=false;
				audio.Stop();
				//disable thrusters
				topThruster.emit=false;
				mainThruster.emit=false;
				leftThruster.emit=false;
				rightThruster.emit=false;
			}
			GUI.UpdateFuelMeter(fuelAmount);
		}
		else if(audio.isPlaying)
		{
			audio.Stop();
		}
	}
}

function OnCollisionEnter(hitInfo:Collision)
{
	if(hitInfo.gameObject.tag=="LaserBeam" && shieldActive==false)
	{
		if(gameInfo.difficulty==1)
		{
			healthAmount-=10;
			GUI.UpdateHealthMeter(healthAmount);
		}
		else
		{
			healthAmount-=20;
			GUI.UpdateHealthMeter(healthAmount);
			var contact = hitInfo.contacts[0];
			var pos = contact.point;
			Instantiate(shipExplosions[1], pos, transform.rotation);

		}
	}
	if(hitInfo.gameObject.tag=="LightCube")
	{
		lightSource.SetActive(true);
	}
	
	if(hitInfo.gameObject.tag=="ShieldCube")
	{
		shield.SetActive(true);
		shieldActive=true;
	}
	
	if(hitInfo.gameObject.tag=="ScoreCube")
	{
		GUI.doubleScore();
	}
	
	if(hitInfo.gameObject.tag=="FuelCube")
	{
		fuelAmount=100;
		haveFuel=true;
		GUI.UpdateFuelMeter(fuelAmount);
	}
	
	if(hitInfo.gameObject.tag=="HealthCube")
	{
		healthAmount=100;
		GUI.UpdateHealthMeter(healthAmount);
	}

	if(hitInfo.gameObject.tag=="Flame" && shieldActive==false)
	{
		if(gameInfo.difficulty==1)
		{
			healthAmount-=10;
			GUI.UpdateHealthMeter(healthAmount);
		}
		else
		{
			healthAmount-=20;
			GUI.UpdateHealthMeter(healthAmount);
		}
	}

	if(hitInfo.relativeVelocity.magnitude>2.5 && shieldActive==false && hitInfo.gameObject.tag!="HealthCube" && hitInfo.gameObject.tag!="FuelCube" && hitInfo.gameObject.tag!="ScoreCube" && hitInfo.gameObject.tag!="ShieldCube" && hitInfo.gameObject.tag!="LightCube" && hitInfo.gameObject.tag!="Debris" && hitInfo.gameObject.tag!="ColliderPlane" && hitInfo.gameObject.tag!="Switch" && hitInfo.gameObject.tag!="LandingPad")  //kokkupõrkejõud objektiga suurem kui 2,5
	{
		crashSounder.audio.Play();
		if(gameInfo.difficulty==1) //easy
		{
			healthAmount-=(Mathf.Abs((hitInfo.relativeVelocity.magnitude*damageMultiply)))/2;
		}
		else //normal ja hard
		{
			healthAmount-=Mathf.Abs((hitInfo.relativeVelocity.magnitude*damageMultiply));
		}
		if (healthAmount<=0)
		{
			healthAmount=0;
			GUI.UpdateHealthMeter(healthAmount);
			Explode();
		}
		else {GUI.UpdateHealthMeter(healthAmount);}	
	}
	if (hitInfo.gameObject.tag == "LandingPad" && healthAmount>0) // kui puututi kokku objektiga millel tag "LandingPad"
	{
		var landingPad:LandingPad; //muutuja nimega landingPad mille tüübiks avatav script
		landingPad=hitInfo.gameObject.GetComponent("LandingPad"); //sebin teiselt objektilt skcripti
		landingPad.Activate(); //kasutan teise objekti scriptis olevat funktsiooni.
		fuelAmount=100;
		haveFuel=true;
		if(gameInfo.difficulty==1 || gameInfo.difficulty==2) // easy ja normal
		{
			healthAmount=100;
		}
		GUI.UpdateHealthMeter(healthAmount);
		GUI.UpdateFuelMeter(fuelAmount);
		lightSource.SetActive(false);
		shield.SetActive(false);
		shieldActive=false;
	}
}
function audioStop()
{
	audio.Stop();
}
function audioPlay()
{
	if(!audio.isPlaying)
	{
		audio.Play();	
	}
}
function Explode()
{
	var randomNumber:int;
	randomNumber=Random.Range(0,shipExplosions.length);
	
	Instantiate(shipExplosions[randomNumber],transform.position,transform.rotation);
	GUI.Lose();
	Destroy(gameObject);
	
}
function moveUp()
{
	moveUpF=true;
	moveDownF=false;
}
function moveDown()
{
	moveDownF=true;
	moveUpF=false;
}
function horizontalStop()
{
	moveUpF=false;
	moveDownF=false;
}
function moveLeft()
{
	moveLeftF=true;
	moveRightF=false;
}
function moveRight()
{
	moveRightF=true;
	moveLeftF=false;
}
function verticalStop()
{
	moveRightF=false;
	moveLeftF=false;
}