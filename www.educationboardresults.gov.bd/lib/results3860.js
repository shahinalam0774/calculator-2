$(function(){

	var base_url = window.location.origin + '/results';

	$('#roll,#reg,#value_s').keypress(function(evt){
		var e = event || evt; // for trans-browser compatibility
		var charCode = e.which || e.keyCode;
		if (charCode > 31 && (charCode < 47 || charCode > 57))
			return false;
		return true;
	});

	$('#btnPrint').hide();

	$('#reset').click(function(){
		$('#board').val("-1");
		$('#roll').val('');
		$('#reg').val('');
		$('#value_s').val('');
		$('#contentRegion').html('');
		$('#btnPrint').css({'display':'none'});
	});

	$('#frmPage').on('submit',(function(e) {
		if($('#board').val() == -1){
			alert('Please Select Board!');
			$('#board').focus();
		}else if($('#roll').val().trim() == ''){
			alert('Please Enter Exam Roll!');
			$('#roll').focus();
		}else if($('#reg').val().trim() == ''){
			alert('Please Enter Registration Number!');
			$('#reg').focus();
		}else if($('#value_s').val().trim() == ''){
			alert('Please Enter the Value');
			$('#value_s').focus();
		}else{
			$.ajax({
				url: "result.php", // Url to which the request is send
				type: "POST",             // Type of request to be send, called as method
				data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
				contentType: false,       // The content type used when sending data to the server.
				cache: false,             // To unable request pages to be cached
				processData:false,        // To send DOMDocument or non processed data file it is set to false
				beforeSend: function() {
					$('#response').html('<img src="'+base_url+'/images/ajax_loading.gif" />');
				},
				success: function(data)   // A function to be called if request succeeds
				{
					txt = $.trim($(data).text());

					$('#contentRegion').html(data);
					$('#response').html("");
					var a = Math.floor(Math.random() * 9) + 1;
					var b = Math.floor(Math.random() * 9) + 1;
					$('#value_a').val(a);
					$('#value_b').val(b);
					$('#captcha').text(a + " + " + b);
					$('#value_s').val('');
					if(txt != 'RESULT NOT FOUND!' && txt != 'RESULT IS NOT PUBLISHED YET!' && txt != 'Entered value does not match!'){
						$('#btnPrint').css({'display':'block'});
					}else{
						$('#btnPrint').css({'display':'none'});
					}
				}
			});
		}
		return false;
	}));
});