#pragma strict

var rockObject:Rigidbody;

InvokeRepeating("throwRock", 1, 1.65); //("funktsiooni nimi",aega käivituseni,intervall)

function throwRock()
{
	var clone:Rigidbody;
	clone=Instantiate(rockObject,transform.position,transform.rotation);
	clone.velocity = gameObject.transform.forward*10;
}