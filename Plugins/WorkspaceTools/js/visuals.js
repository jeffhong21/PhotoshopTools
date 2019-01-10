window.onerror = function(a, g, e) {
    console.log("Error: " + a + " Script: " + g + " Line: " + e)
};
var ready = !1;

function itemEditState() {
    $(".item").css("cursor", "move");
    TweenMax.to($(".slide"), 0.2, {
        xPercent: -50
    });
    TweenMax.to($(".itemDeleteButton"), 0.2, {
        scale: 1,
        delay: 0.2
    });
    TweenMax.to($(".item"), 0.2, {
        paddingRight: 40,
        width: 168
    });
    TweenMax.to($("#buttonEditDone"), 0.2, {
        autoAlpha: 0.5,
        width: 44
    });
    TweenMax.to($("#buttonIconMode"), 0.2, {
        autoAlpha: 0,
        width: 0,
        paddingRight: 0,
        paddingLeft: 0
    });
    TweenMax.to($("#buttonGear"), 0.2, {
        autoAlpha: 0,
        width: 0,
        paddingRight: 0,
        paddingLeft: 0
    });
    TweenMax.to($("#buttonResources"), 0.2, {
        autoAlpha: 0,
        width: 0,
        paddingRight: 0,
        paddingLeft: 0
    });
    TweenMax.to($("#buttonDoneResources"), 0.2, {
        autoAlpha: 0,
        width: 0,
        paddingRight: 0,
        paddingLeft: 0
    });
    for (var a = 0; a < $(".itemIcon").length; a++)
        if (-1 != $($(".itemIcon")[a]).css("background-image").indexOf("addIcon.png") || -1 != $($(".itemIcon")[a]).css("background-image").indexOf("noIcon.png")) $($(".itemIcon")[a]).css({
            "background-image": "url(img/addIcon.png)",
            "background-color": "rgba(0, 0, 0, 0)"
        }), $($(".itemIcon")[a]).css({
            "background-color": "rgba(0, 0, 0, 0)"
        });
    TweenMax.to($(".dragBg"), 0.2, {
        css: {
            backgroundPosition: "right"
        }
    });
    TweenMax.to($(".itemIcon"), 1, {
        css: {
            backgroundColor: "rgba(0, 0, 0, 0)"
        }
    });
//    Aqui
    TweenMax.to($(".scriptButton"), 1, {
        css: {
            backgroundColor: "rgba(0, 0, 0, 0)"
        }
    });
    
    $("#editMode").val(!0);
    $("#container").sortable("enable");
    $(".scriptButton").width(160)
    
}

function showNoScript() {
    $("#noElement").show()
}

function hideNoScript() {
    $("#noElement").hide()
}
$(document).ready(function() {
    function a() {
        try {
            $("iframe")[0].contentWindow.postMessage(window.location.href, frameAddress), ready || setTimeout(function() {
                a()
            }, 2E3)
        } catch (g) {
            setTimeout(function() {
                a()
            }, 2E3)
        }
    }
    setTimeout(function() {
        function g() {
            $(".item").css("cursor", "default");
            TweenMax.to($(".itemDeleteButton"), 0.2, {
                scale: 0
            });
            TweenMax.to($(".item"), 0.2, {
                paddingRight: 8,
                delay: 0.2
            });
            TweenMax.to($("#buttonGear"), 0.2, {
                autoAlpha: 0.5,
                width: 23
            });
            TweenMax.to($("#buttonResources"), 0.2, {
                autoAlpha: 0.5,
                width: 68
            });
            TweenMax.to($("#buttonIconMode"), 0.2, {
                autoAlpha: 0.5,
                width: 23
            });
            TweenMax.to($("#buttonEditDone"), 0.2, {
                autoAlpha: 0,
                width: 0,
                paddingRight: 0,
                paddingLeft: 0
            });
            TweenMax.to($("#buttonDoneResources"), 0.2, {
                autoAlpha: 0,
                width: 0,
                paddingRight: 0,
                paddingLeft: 0
            });
            for (var b = 0; b < $(".itemIcon").length; b++) - 1 != $($(".itemIcon")[b]).css("background-image").indexOf("addIcon.png") && $($(".itemIcon")[b]).css({
                "background-image": "url(img/noIcon.png)"
            });
            TweenMax.to($(".slide"), 0.2, {
                xPercent: -50
            });
            TweenMax.to($(".dragBg"), 1, {
                css: {
                    backgroundPosition: "180"
                }
            });
            $(".dragBg").css("background-position", "100% 180px");
            TweenMax.to($(".itemIcon"), 1, {
                css: {
                    backgroundColor: "rgba(20, 20, 20, 0)"
                }
            })
        }

        function e() {
            !0 == f ? TweenMax.to($(".item"), 0.2, {
                width: 168,
                delay: 0.2
            }) : TweenMax.to($(".item"), 0.2, {
                width: 30,
                paddingRight: 0,
                paddingLeft: 0,
                delay: 0.2
            })
        }

        function h() {
            TweenMax.to($(".item"), 0.2, {
                width: 30,
                paddingRight: 0,
                paddingLeft: 0,
                delay: 0.2
            });
            $(".dragBg").css("background-position", "180px");
            $("#buttonIconMode").css({
                "background-image": "url(img/iconModeOff.png)"
            })
        }

        function k() {
            TweenMax.to($(".item"),
                0.2, {
                    width: 168,
                    delay: 0.2
                });
            "true" == $("#editMode").val() && $(".dragBg").css("background-position", "100% 50%");
            $("#buttonIconMode").css({
                "background-image": "url(img/iconModeOn.png)"
            })
        }

        function l() {
            $("#buttonResources").hide();
            $("#buttonGear").hide();
            $("#buttonIconMode").hide();
            $(".header").hide();
            h()
        }

        function m() {
            e();
            $("#buttonResources").show();
            $("#buttonGear").show();
            $("#buttonIconMode").show();
            $(".header").show();
            f && setTimeout(function() {
                k()
            }, 200)
        }

        function n(b) {
            "false" == b && (timeout = !1, 150 > $(".header").width() ?
                !c && 80 < $("body").height() && (l(), c = !0) : c && 80 < $("body").height() && (m(), c = !1, $(".slideContainer").height($(window).height() - 38)), 80 > $("body").height() ? !d && 150 < $(".header").width() && (l(), d = !0, $(".slideContainer").height("100%")) : d && 150 < $(".header").width() && (m(), d = !1, $(".slideContainer").height($(window).height() - 38)), setTimeout(function() {
                    $(".item").trigger("mouseover")
                }, 300))
        }

        function p() {
            80 < $("body").height() && $(".slideContainer").height($(window).height() - 38);
            "none" == $(".header").css("display") &&
                $(".slideContainer").height("100%")
        }

        function q() {
            if (new Date - rtime < delta) setTimeout(q, delta);
            else {
                var b = $("#editMode").val();
                n(b)
            }
        }
        var f = !0,
            c = !1,
            d = !1;
        $(".item").css("cursor", "default");
        $(".itemDeleteButton").css("cursor", "default");
        $(".itemIcon").css("cursor", "default");
        TweenMax.to($(".item"), 0, {
            paddingRight: 8
        });
        TweenMax.to($(".itemDeleteButton"), 0, {
            scale: 0
        });
        TweenMax.to($(".slide"), 0, {
            xPercent: -50
        });
        TweenMax.to($("#buttonDoneResources"), 0, {
            autoAlpha: 0,
            width: 0,
            paddingRight: 0,
            paddingLeft: 0
        });
        TweenMax.to($("#buttonEditDone"),
            0, {
                autoAlpha: 0,
                width: 0,
                paddingRight: 0,
                paddingLeft: 0
            });
        TweenMax.to($("#buttonResources"), 0, {
            autoAlpha: 0.5
        });
        TweenMax.to($("#buttonGear"), 0, {
            autoAlpha: 0.5,
            width: 23
        });
        TweenMax.to($("#buttonAdd"), 0, {
            autoAlpha: 0.5,
            width: 23
        });
        TweenMax.to($("#buttonIconMode"), 0, {
            autoAlpha: 0.5,
            width: 23
        });
        TweenMax.to($(".dragBg"), 0.2, {
            css: {
                backgroundPosition: "180"
            }
        });
        $(".dragBg").css("background-position", "100% 180px");
        
        TweenMax.to($(".itemIcon"), 1, {
            css: {
                backgroundColor: "rgba(20, 20, 20, 0)"
            }
        });
        addFrame("panel1");
        $("#buttonResources").click(function() {
            var b =
                $(".frame");
            navigator.onLine ? (rest(), b.attr("src") != frameAddress && b.attr("src", frameAddress)) : b.attr("src", "noInternet.html");
            TweenMax.to($(".slide"), 0.2, {
                xPercent: 0
            });
            TweenMax.to($("#buttonDoneResources"), 0.2, {
                autoAlpha: 0.5,
                width: 44
            });
            TweenMax.to($("#buttonResources"), 0.2, {
                autoAlpha: 0,
                width: 0,
                paddingRight: 0,
                paddingLeft: 0
            });
            TweenMax.to($("#buttonGear"), 0.2, {
                autoAlpha: 0,
                width: 0,
                paddingRight: 0,
                paddingLeft: 0
            });
            TweenMax.to($("#buttonIconMode"), 0.2, {
                autoAlpha: 0,
                width: 0,
                paddingRight: 0,
                paddingLeft: 0
            });
            setTimeout(function() {
                    a()
                },
                2E3)
        });
        $("#buttonDoneResources").click(function() {
            g();
            e();
            processDel()
        });
        $("#buttonGear").click(function() {
            timeout = d = c = !1;
            itemEditState();
            $(".scriptButton").attr("style", "white-space:nowrap;");
            $(".scriptButton").width(140)
                        
        });
        //Aqui
        $("#buttonEditDone").click(function() {
            $("#container").sortable("disable");
            g();
            e();
            $("#editMode").val(!1);
            timeout = d = c = !1;
            $("#buttonResources").show();
            $("#buttonGear").show();
            $("#buttonIconMode").show();
            $(".scriptButton").width(160);
                        
            saveList()
        });
        $("#buttonIconMode").click(function() {
            "true" ==
            $("#editMode").val() ? $(".dragBg").css("background-position", "100% 50%") : $(".dragBg").css("background-position", "180px");
            !0 == f ? (f = !1, h()) : (f = !0, k());
            e();
            savePanelState(f)
        });
        $("#buttonAdd").click(function() {
            onClickButton("PHXS")
        });
        $(".itemDeleteButton").each(function(b) {
            $(this).click(function() {
                $(this).parent().remove()
            })
        });
        $("#buttonAdd").mouseover(function() {
            TweenMax.to($(this), 0.2, {
                autoAlpha: 1
            })
        });
        $("#buttonAdd").mouseout(function() {
            TweenMax.to($(this), 0.2, {
                autoAlpha: 0.5
            })
        });
        $("#buttonResources").mouseover(function() {
            TweenMax.to($(this),
                0.2, {
                    autoAlpha: 1
                })
        });
        $("#buttonResources").mouseout(function() {
            TweenMax.to($(this), 0.2, {
                autoAlpha: 0.5
            })
        });
        $("#buttonDoneResources").mouseover(function() {
            TweenMax.to($(this), 0.2, {
                autoAlpha: 1
            })
        });
        $("#buttonDoneResources").mouseout(function() {
            TweenMax.to($(this), 0.2, {
                autoAlpha: 0.5
            })
        });
        $("#buttonGear").mouseover(function() {
            TweenMax.to($(this), 0.2, {
                autoAlpha: 1
            })
        });
        $("#buttonGear").mouseout(function() {
            TweenMax.to($(this), 0.2, {
                autoAlpha: 0.5
            })
        });
        $("#buttonEditDone").mouseover(function() {
            TweenMax.to($(this),
                0.2, {
                    autoAlpha: 1
                })
        });
        $("#buttonEditDone").mouseout(function() {
            TweenMax.to($(this), 0.2, {
                autoAlpha: 0.5
            })
        });
        $("#buttonIconMode").mouseover(function() {
            TweenMax.to($(this), 0.2, {
                autoAlpha: 1
            })
        });
        $("#buttonIconMode").mouseout(function() {
            TweenMax.to($(this), 0.2, {
                autoAlpha: 0.5
            })
        });
        $(window).resize(function(b) {
            p();
            rtime = new Date;
            !1 === timeout && (timeout = !0, setTimeout(q, delta))
        });
        $("#icon_PHXS_Expand1234567890").css("background-image", "url(img/addIcon.png)");
        $("#container").sortable({
            update: function(b, a) {
                saveList()
            }
        });
        $("#container").disableSelection();
        $("#container").sortable("disable");
        p();
        d = c = !1;
        setTimeout(function() {
            n("false");
            $(".dragBg").css("background-position", "180px")
        }, 300);
        "false" == $("#buttonScriptButtonSize").val() && $("#buttonIconMode").trigger("click")
    }, 500);
    window.addEventListener("message", function(a) {
        console.log("message back received:  " + a.data, a);
        "ready" == a.data ? ready = !0 : OpenBrow(a.data)
    }, !1)
});