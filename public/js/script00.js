// loader
// var div = document.createElement('div');
// div.className += 'loader hide';
// div.innerHTML = '<svg viewBox="0 0 140 185" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.69 95.72l13.06 15.786M9.96 55.175l19.988 52.356m4.088-87.11l9.654 82.908M137.31 95.528l-13.208 15.685m5.858-55.97l-20.214 52.021m-4.135-86.55l-9.763 82.375" stroke="#F7AF35" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.857 137.886c-.986 14.992 8.83 44.975 55.985 44.975 47.154 0 55.908-29.983 54.391-44.975" stroke="#000" stroke-width="4" stroke-linecap="round"/><path d="M45.263 144.157c-12.365-.607-37.096-4.461-37.096-15.02 0-10.56 41.087-15.931 62.13-15.931 21.611-.948 60.991 5.371 60.991 15.931 0 10.559-23.668 14.413-35.503 15.02M26.313 149.841l5.224 15.559m6.587-9.085l2.272 9.085m9.313-11.584l.908 18.172m9.54-14.31v11.697m9.427-15.559v19.648m9.653-15.786v11.697m10.55-15.559l-.814 18.172m11.941-15.751l-1.904 9.507m13.885-15.903l-4.918 15.559M56.783 144.97h27.84" stroke="#000" stroke-width="4" stroke-linecap="round"/><path d="M77.026 90.776a2 2 0 10-2.536 3.094l2.536-3.094zm4.08 36.143a2 2 0 104 0h-4zm-6.616-33.05c1.155.947 2.9 2.553 4.335 4.245.718.847 1.32 1.67 1.731 2.408.434.775.55 1.265.55 1.496h4c0-1.239-.497-2.444-1.058-3.448-.583-1.043-1.36-2.084-2.172-3.042-1.627-1.919-3.556-3.691-4.85-4.752L74.49 93.87zm6.616 8.149v24.901h4v-24.901h-4z" fill="#000"/><path fill="#E5E5E5" d="M58.36 108.454h22.868v8.165H58.36z"/><path d="M76.33 108.454a2 2 0 00-4 0h4zm-4 17.757a2 2 0 104 0h-4zm0-17.757v17.757h4v-17.757h-4z" fill="#000"/><path d="M41.622 130.746c7.965-3.186 30.359-7.647 56.212 0" stroke="#000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M73.51 80.021c-.306 2.642-2.561 8.71-9.132 11.84-6.571 3.13-7.931 9.718-7.79 12.622l-.144 21.959" stroke="#000" stroke-width="4"/><path d="M65.76 80.208C61.08 55.402 54.876 5.082 67.516 2.247c12.64-2.835 9.246 50.793 5.969 77.961" stroke="#000" stroke-width="4"/><path d="M66.94 108.454a2 2 0 00-4 0h4zm-4 17.757a2 2 0 104 0h-4zm0-17.757v17.757h4v-17.757h-4z" fill="#000"/></svg>'

// document.body.appendChild(div);
function hideLoader() {
	setTimeout(function() {
		document.querySelector(".loader").classList.add("hide");
	}, 1500);
}
// if(document.querySelector('.loader')){
// 	setTimeout(function () {
// 		document.querySelector('.loader').classList.remove('hide');
// 		hideLoader()
// 	}, 10)
// }

// \ loader

class Image {
	static preview(file, wrap) {
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function() {
			console.log(reader.result);
			wrap.querySelector(".review").setAttribute("src", reader.result);
		};
		reader.onerror = function(error) {
			console.log("Error: ", error);
			wrap.querySelector(".review").setAttribute("src", "");
		};
	}
	static change(el) {
		let size = (el.files[0].size / (1024 * 1024)).toFixed(2);
		let maxSize = 5.0;
		let form = el.closest(".upload");
		let type = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
		if (type.includes(el.files[0].type) != true || size > maxSize) {
			form.classList.add("error");
			el.value = "";
			form.classList.remove("show");
		} else {
			this.preview(el.files[0], form);
			form.classList.remove("error");
			form.querySelector(".file_name").innerText = el.files[0].name;
			form.classList.add("show");
		}
	}
	static cancel(el) {
		el.closest(".upload").querySelector("[type=file]").value = "";
		el.closest(".upload")
		.querySelector(".review")
		.setAttribute("src", "");
		el.closest(".upload").classList.remove("show");
	}
}
class Alert {
	static green(text) {
		if(document.querySelector('.general_alert')) {
			document.querySelector('.general_alert p').innerText = text;
			document.querySelector('.general_alert').classList.add('green');
			setTimeout(function () {
				document.querySelector('.general_alert').className = 'general_alert';
			}, 2000)
		}
	}
	static red(text) {
		if(document.querySelector('.general_alert')) {
			document.querySelector('.general_alert p').innerText = text;
			document.querySelector('.general_alert').classList.add('red');
			setTimeout(function () {
				document.querySelector('.general_alert').className = 'general_alert';
			}, 2000)
		}
	}
	static info(text) {
		if(document.querySelector('.general_alert')) {
			document.querySelector('.general_alert p').innerText = text;
			document.querySelector('.general_alert').classList.add('red');
			setTimeout(function () {
				document.querySelector('.general_alert').className = 'general_alert';
			}, 2000)
		}
	}
}
class Order {
	static  category(el) {
		console.log(el.value)
		let order = el.value.toLowerCase();
		if(order == 'sauces' || order == 'drinks') {
			el.closest('form').classList.remove('for_pizza');
		}
		else {
			el.closest('form').classList.add('for_pizza');
		}
	}
}


class Offer {
	static remove(el, info) {
		el.closest('.col').classList.add('remove');
		
		fetch(`/offer-remove${info}`, {
			method: "DELETE"
		}).then(response => response.json())
		.then(item => {
			if(item.status == 200) {
				setTimeout(function () {
					el.closest('.col').remove();
				}, 1000);
				Alert.green('Offer removed!!!');
			}
			else {
				el.closest('.col').classList.remove('remove');
				Alert.red('Offer not removed! Try again');
			}
		});
		console.log(info)
	}
}

class Category {
	static remove(el, info) {
		el.closest('.category_line').classList.add('remove');
		console.log(info);
		fetch(`/remove-category${info}`, {
			method: "DELETE"
		}).then(response => response.json())
		.then(item => {
			console.log(item)
			if(item.status == 200) {
				setTimeout(function () {
					el.closest('.category_line').remove();
				}, 1000);
				Alert.green('Category removed!!!');
			}
			else {
				el.closest('.col').classList.remove('remove');
				Alert.red('Category not removed! Try again');
			}
		});
		console.log(info)
	}
}


function mobileMenu(el) {
	el.closest("header").classList.toggle("active");
	document.querySelector("header .right").classList.toggle("active");
	document.querySelector("body").classList.toggle("hidden");
}

window.addEventListener("resize", function(el) {
	var w = window.innerWidth;
	if (w > 992) {
		document.querySelector("header").classList.remove("active");
		document.querySelector("header .right").classList.remove("active");
		document.querySelector("body").classList.remove("hidden");
	}
});

// select
function select(el) {
	el.classList.toggle("active");
}
function selectHide(el) {
	el.closest(".select").classList.remove("active");
}
function choose(el) {
	el.closest("ul")
	.querySelectorAll("li")
	.forEach(function(item) {
		item.className = "";
	});
	el.closest(".select").querySelector(".indicator").value = el.innerText;
	el.classList.add("active");
}

function selectToggle(el) {
	el.classList.toggle("active");
}
function choosePie(el) {
	if (!el.closest(".select").classList.contains("theme")) {
		el.closest("ul")
		.querySelectorAll("li")
		.forEach(function(item) {
			item.className = "";
		});
		var title = el.querySelector(".col_title").innerText;
		var price = el.getAttribute("data-price");
		var obj = el.innerHTML;
    //pasting info
    el.closest(".select").querySelector(".indicator span").innerHTML =
    title + " - " + "<b>" + price + "</b>";
    el.closest(".select").querySelector("input").value = title;
    el.classList.add("active");
    el.closest(".col_line").querySelector(".result").innerHTML = obj;
} else if (el.closest(".select").classList.contains("theme")) {
	el.closest("ul")
	.querySelectorAll("li")
	.forEach(function(item) {
		item.className = "";
	});
	el.classList.add("active");
	el.closest(".select").querySelector("input").value = el.innerText;
}
}

// \ select

//size
function pieSize(el, price) {
	el.closest("ul")
	.querySelectorAll("li")
	.forEach(function(item) {
		item.className = "";
	});
	el.classList.add("active");
	el
	.closest(".offer_wrap")
	.querySelector(".offer_price").innerText = `${price} грн.`;
}

// validation
function everyField() {
	var fields = document.querySelectorAll(".form .required");

	fields.forEach(function(el) {
		if (el.value.length < 3) {
			el.classList.add("empty");
		} else {
			el.classList.remove("empty");
			el.classList.remove("error");
		}
	});
}

function attributeSend() {
	var a = document.querySelec;
	if (a == 0) {
		document.querySelector(".form .send").setAttribute("type", "submit");
	} else {
		document.querySelector(".form .send").setAttribute("type", "button");
	}
}

function error() {
	attributeSend();

	var fields = document.querySelectorAll(".form .empty");
	fields.forEach(function(el) {
		if (el.classList.contains("empty")) {
			if (el.closest("label")) {
				el.closest("label").classList.add("error");
			} else {
				el.classList.add("error");
			}
		} else {
			if (el.closest("label")) {
				el.closest("label").classList.remove("error");
			} else {
				el.classList.remove("error");
			}
		}
	});
}

// if(document.querySelector('.form')){
// 	everyField();
// 	attributeSend();
// 	document.querySelectorAll(".form .required").forEach(function (el){
// 		el.addEventListener('keyup', function(item){
// 			if(item.target.value.length >= 3) {
// 				item.target.className = 'required';
// 			}
// 			else {
// 				item.target.classList.add('required');
// 			}
// 		})
// 	})
// 	document.querySelector(".send").addEventListener("click", function(el) {
// 		var a = this.getAttribute("type");
// 		everyField();
// 		attributeSend();
// 		error();
// 	});
// }

// offer cart
function toOrder(el) {
	var block = document.querySelector("header .indicator");
	var oldSumm = +block.innerText;
	var newSumm = oldSumm + 1;
	block.innerText = newSumm;
	el.classList.add("active");
	setTimeout(function() {
		el.classList.remove("active");
	}, 700);
}

function infoTotal() {
	if (document.querySelector('.form input[name="total_price"]')) {
		setTimeout(function() {
			if (
				document.querySelector('.form input[name="total_price"]').value < 700
				) {
				setTimeout(function() {
					document.querySelector(".modal_window").className += "active info";
				}, 1000);
		}
	}, 1000);
	}
}

function propos() {
	if(document.querySelector(".modal_window")){
		var coca = document.querySelectorAll(".cart .result .line_pie.coca").length;
		if (coca == 0) {
			if (!document.querySelector(".modal_window").classList.contains("info")) {
				setTimeout(function() {
					document.querySelector(".modal_window").className += "active add_offer";
				}, 5000);
			}
		}
	}
}

function closeModal(el) {
	document.querySelector(".modal_window").className = "modal_window";
}

function total(el) {
	var total = 0;
	document.querySelectorAll(".cart .line_pie").forEach(function(item) {
		total = Number(item.getAttribute("data-price")) + Number(total);
	});
	if(document.querySelector('.form input[name="total_price"]')){
		document.querySelector('.form input[name="total_price"]').value = total;
		document.querySelector(".cart .total").innerText = total + " грн.";
		infoTotal();
	}

}

function plus(el) {
	var price = el.closest(".line_pie").getAttribute("data-price");
	var fileld = el.closest(".line_summ").querySelector(".indicator");
	var startPrice = el.closest(".line_pie").getAttribute("data-start");
	var now = Number(fileld.value);
	var numb = now + 1;
	fileld.value = numb;
	var newPrice = numb * startPrice;

	el.closest(".line_pie").setAttribute("data-price", newPrice);
	el.closest(".line_pie").querySelector(".price").innerText =
	newPrice + " руб.";
	total();
}

function minus(el) {
	var price = el.closest(".line_pie").getAttribute("data-price");
	var fileld = el.closest(".line_summ").querySelector(".indicator");
	var startPrice = el.closest(".line_pie").getAttribute("data-start");
	var now = Number(fileld.value);
	if (now > 1) {
		var newPrice = price - startPrice;
		var numb = now - 1;
		fileld.value = numb;

		el.closest(".line_pie").setAttribute("data-price", newPrice);
		el.closest(".line_pie").querySelector(".price").innerText =
		newPrice + " руб.";
		total();
		infoTotal();
	}
}

function remove(el) {
	el.closest(".line_pie").remove();
	total();
	infoTotal();
}

if (document.querySelector(".cart")) {
	total();
	infoTotal();
	propos();
}

jQuery(document).ready(function($) {
	if ($("body").find(".banner")) {
		$(".banner").slick({
			draggable: true,
			autoplay: true,
			autoplaySpeed: 3500,
			infinite: true,
			slidesToScroll: 1,
			arrows: false,
			slidesToShow: 1,
			dots: false,
			prevArrow:
			'<svg class="slick-prev" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 284.929 284.929" style="enable-background:new 0 0 284.929 284.929;" xml:space="preserve"><g><path d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441 L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082 c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647 c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z" /></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>',
			nextArrow:
			'<svg class="slick-next" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 284.929 284.929" style="enable-background:new 0 0 284.929 284.929;" xml:space="preserve"><g><path d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441 L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082 c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647 c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z" /></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>',
			dotsClass: "slick-dots",
			pauseOnHover: false
		});
		$(".banner").on("afterChange", function(
			event,
			slick,
			currentSlide,
			nextSlide
			) {
			var current = currentSlide + 1;
			document.querySelector(".banner").className = "banner a" + current;
		});
	}
});
