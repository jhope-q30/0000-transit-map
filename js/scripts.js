(function(){

    var $toggles = document.querySelectorAll("input"),
        $class_on = 'active',
        $class_off = 'off',
        $forEach = function(array, callback, scope){
            for (var i = 0; i < array.length; i++){
                callback.call(scope, i, array[i]);
            }
        },
        $toggle_class = function(el, className){
            if (el.classList) {
                el.classList.toggle(className);
            } else {
                var classes = el.className.split(' ');
                var existingIndex = classes.indexOf(className);
                if (existingIndex >= 0){
                    classes.splice(existingIndex, 1);
                }else{
                    classes.push(className);
                    el.className = classes.join(' ');
                }
            }
        },
        $has_class = function(el, className){
            if(el.classList){
                return el.classList.contains(className);
            }else{
                return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
            }
            return false;
        },
        $add_class = function(el, className){
            if (el.classList){
                el.classList.add(className);
            }else{
                el.className += ' ' + className;
            }
        },
        $remove_class = function(el, className){
            if (el.classList){
                el.classList.remove(className);
            }else{
                el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        },
        $toggle_btn = function(e){
            if(e.target.tagName.toLowerCase() == 'input'){
                var $img = document.getElementById(e.target.value);
                if(e.target.checked){
                    if($has_class($img, $class_off)){  
                        $remove_class($img, $class_off);
                    }
                    if(!$has_class($img, $class_on)){
                        $add_class($img, $class_on);
                    }
                }else{
                    if($has_class($img, $class_on)){  
                        $remove_class($img, $class_on);
                    }
                    if(!$has_class($img, $class_off)){
                        $add_class($img, $class_off);
                    }
                }
            }
        }

    $forEach($toggles, function (index, value) {
        // clear checked ( browser refreshes )
        if(value.checked){
            value.checked = false;
        }
        $parent_node = value.parentNode;
        $parent_node.onclick = function(e){
            $toggle_btn(e);
        }
    });

})();