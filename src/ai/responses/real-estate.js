export function ACKNOWLEDGE_USER_INTENT({intent, property_type}) {
  if (property_type) {
    return `Ok, you want to ${intent} a/n ${property_type}`;
  } else {
    return `Ok, you want to ${intent} something`;
  }
}
