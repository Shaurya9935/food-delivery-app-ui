# Food Delivery App UI (React Native & Expo)

A beautiful, high-fidelity Food Delivery App UI designed to demonstrate and practice advanced React Navigation patterns, conditional authentication routing, state persistence, nested navigators, custom drawer layouts, and deep-link redirection.

---

## 🎨 Theme & Color Palette
The design utilizes a carefully selected warm food aesthetic theme:
- **Primary / Accent**: `#F62440` (vibrant red/coral) - used for active indicators, primary buttons, and cart badges.
- **Background**: `#FFFAF3` (warm cream) - used as the main canvas background for a premium feel.
- **Secondary Tones**: `#FFE5BF` & `#FFF2DB` (peach accents) - used for card containers, inputs, list headers, and secondary items.

---

## 🛠️ Tech Stack
- **Framework**: [Expo](https://expo.dev/) (SDK 55)
- **Core Library**: [React Native](https://reactnative.dev/) (v0.83.6)
- **Navigation**: [React Navigation 7](https://reactnavigation.org/) (Static/Conditional/Dynamic API)
- **State Management**: React Context API (`AuthProvider` & `CartProvider`)
- **Persistence**: `@react-native-async-storage/async-storage`
- **Icon Pack**: `@expo/vector-icons` (Ionicons)

---

## 📌 Navigation Structure

The navigation is structured as a tree of nested navigators to handle conditional flows and screen overlays cleanly:

```text
RootNavigator (Conditional Stack)
 ├── 🔓 Unauthenticated Flow (Auth Stack)
 │    ├── OnboardingScreen (Get Started button)
 │    └── LoginScreen (Email/Password mock credentials)
 │
 └── 🔐 Authenticated Flow (MainDrawer - Custom Drawer)
      ├── MainTabs (Bottom Tab Navigator)
      │    ├── HomeTab (HomeStack - Nested Stack Navigator)
      │    │    ├── HomeScreen (Category Filters & Restaurant List)
      │    │    ├── RestaurantDetailScreen (Menu Items List & Floating Cart Bar)
      │    │    └── CartScreen (Checkout Breakdown & Quantities)
      │    │
      │    ├── Search (Search & Tag Filters Screen)
      │    ├── Orders (Active Trackers & History Screen)
      │    └── Profile (User card & Drawer launcher Screen)
      │
      ├── SettingsScreen (App preferences)
      └── HelpScreen (Expandable Accordion FAQs & Support Channels)
```

### Key Navigation Highlights
1. **Conditional Auth Routing**: Handled implicitly through `AuthContext`. Setting authentication state to `true` on login or `false` on logout changes the Root Stack screens, automatically pushing or clearing pages safely.
2. **Dynamic Tab Bar Visibility**: The bottom tab bar is programmatically hidden on the `RestaurantDetail` and `Cart` screens using `getFocusedRouteNameFromRoute` inside the `MainTabs` screen options.
3. **Cart Orders Badge**: Shows a dynamic badge with the current cart quantity on the `Orders` bottom tab.
4. **Custom Headers**: Stack headers feature overridden titles, custom warm background colors (`#FFE5BF`), and customized back button labels (`Back`).
5. **Programmatic Navigational Routing**: Uses `replace` for initial screens, `navigate` for detailing, and `goBack` for stack exits. Placing an order programmatically resets and redirects the user directly to the nested `Orders` tab.

---

## 🔗 Deep Linking Configuration
The application supports deep linking directly to specific restaurants.

### Scheme URL
- **Prefix**: `foodapp://`
- **Pattern**: `foodapp://restaurant/:id`
- **Target**: Navigates to `RestaurantDetailScreen` with parameter `id` (e.g. `123`).

### Testing Deep Links
Ensure your app is running on a simulator or device, then run:

#### iOS Simulator
```bash
xcrun simctl openurl booted foodapp://restaurant/123
```

#### Android Emulator
```bash
adb shell am start -W -a android.intent.action.VIEW -d "foodapp://restaurant/123"
```

#### Expo CLI Diagnostic
```bash
npx uri-scheme open foodapp://restaurant/123 --ios
# or
npx uri-scheme open foodapp://restaurant/123 --android
```

---

## 🚀 How to Run Locally

### 1. Prerequisites
Ensure you have **Node.js** and **Bun** (or `npm`) installed.

### 2. Install Dependencies
```bash
bun install
# or
npm install
```

### 3. Start App
```bash
bun start
# or
npm run start
```
Use the Expo Go app on your phone, or press `i` for iOS Simulator / `a` for Android Emulator.

---

## 🎨 TLDraw Design Board
You can inspect the design flows and wireframes on the [TLDraw Workspace](https://tldraw.com/).

---

## 📝 Key Assumptions Made
1. **Mock Authentication**: Credentials are mock (`user@example.com` / `password`). Successful login writes `user_authenticated` state into `AsyncStorage`, which is read on application reload to persist session.
2. **Restaurant Detail Fallbacks**: If the app is launched directly via the deep link `foodapp://restaurant/:id` without navigating from Home first, fallback mock data for the provided restaurant ID is loaded to ensure a seamless UI state.
