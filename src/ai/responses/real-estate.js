export function ACKNOWLEDGE_USER_INTENT({intent, property_type}) {
  if (property_type) {
    return `Ok, I found this ${property_type}s for you:`;
  } else {
    return `Ok, you want to ${intent} something`;
  }
}
