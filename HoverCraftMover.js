#pragma strict

var Step : float; //A variable we increment
var Height : float; //How far to offset the object upwards
var Speed: float;
var FloatAmount:float;
function Start () 
{      
	var InitialPosition = transform.position; //Store where we were placed in the editor      
	Height = transform.position.y + transform.localScale.y; //Create an offset based on our height
}
function FixedUpdate () 
{
	Step +=Speed;
	if(Step > 999999){Step = 1;} //Make sure Steps value never gets too out of hand 
	transform.position.y = (Mathf.Sin(Step))/FloatAmount+Height; //Float up and down along the y axis,
}