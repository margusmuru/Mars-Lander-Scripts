#pragma strict

var explosion:GameObject;

function OnCollisionEnter(collision : Collision) 
{
	var contact = collision.contacts[0];
	var pos = contact.point;
	transform.renderer.material.color=Color.red;
	yield WaitForSeconds(0.5);
	transform.renderer.material.color=Color.white;
}