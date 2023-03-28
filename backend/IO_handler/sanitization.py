import bleach

def sanitize(input):
    return bleach.clean(input)

def some_input_is_dirty(*inputs):
    some_input_is_dirty = any(input != sanitize(input) for input in inputs)
    if some_input_is_dirty:
        return True
    return False