#pragma strict

var BoxObject:Rigidbody;

InvokeRepeating("DropBox", 1, 1.6); //("funktsiooni nimi",aega käivituseni,intervall)

function DropBox()
{
	var clone:Rigidbody;
	clone=Instantiate(BoxObject,transform.position,transform.rotation);
}