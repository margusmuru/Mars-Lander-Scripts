#pragma strict

function Start () 
{
	yield WaitForSeconds(1);
	Destroy(gameObject);
}

function FixedUpdate () 
{
	if(gameObject.transform.localScale.x>0)
	{
		gameObject.transform.localScale.x = gameObject.transform.localScale.x-0.01;
	}
	if(gameObject.transform.localScale.y>0)
	{
		gameObject.transform.localScale.y = gameObject.transform.localScale.y-0.01;
	}
	if(gameObject.transform.localScale.z>0)
	{
		gameObject.transform.localScale.z = gameObject.transform.localScale.z-0.01;
	}
}