<?php
	$search = $_GET["nySearch"];
	switch ($search){
		case '0':
			echo '{"type":"0","name":"光头","fn":"发光","ADI":"不明","light":[
			{"t1":"光头01","t2":"蛤","t3":"0.5"},
			{"t1":"光头02","t2":"蛤蛤","t3":"0.5"},
			{"t1":"光头03","t2":"蛤蛤蛤","t3":"0.5"}
			],
			"way":"光明与你同在。。。。"
			}';
			break;
		
		case '1':
			echo '{
				"type":"1",
				"select":[
					"1",
					"11",
					"123"
				]
			}';
			break;
	}
?>