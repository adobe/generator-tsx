# Utilities

Utility functions contain supplimental code that is useful, but does not contain
any business logic. [Lodash](https://lodash.com/) is a good example of a utility
library, so you can think of storing similar functions in this folder, so long
as they adhere to the following criteria:

-  Doesn't save state or use global variables.
-  Contains no business logic. If it contains business logic, place it in
   [helpers](../helpers).
