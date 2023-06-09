from bleach import clean

def sanitize(input):
    return clean(input)

def some_input_is_dirty(*inputs):
    some_input_is_dirty = any(input != sanitize(input) for input in inputs)
    if some_input_is_dirty:
        return True
    return False