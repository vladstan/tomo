export function ACKNOWLEDGE_USER_INTENT({intent, property_type, listing}) {
  if (property_type) {
    return `Ok, you want to ${intent} a/n ${property_type} and  here is your ${listing}`;
  } else {
    return `Ok, you want to ${intent} something`;
  }
}
