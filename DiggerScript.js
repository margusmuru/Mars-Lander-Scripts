#pragma strict

var rotateSpeed:float;
//var rockObject:Rigidbody;

function Start () 
{
}

function FixedUpdate () 
{
	transform.Rotate(0,0,rotateSpeed*Time.deltaTime);
	
}
