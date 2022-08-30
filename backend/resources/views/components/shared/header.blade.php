<header>
    <nav class="bg-white shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex">
                    <x-shared.header.logo />
                </div>
                <div class="hidden sm:flex sm:items-center">
                    <div class="hidden sm:flex sm:space-x-4">
                        <x-shared.header.navbar />
                    </div>
                    <div class="ml-6 space-x-2">
                        @auth
                        <a href="{{route('profile.show')}}"
                            class="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">Profile</a>
                        <form class="inline-block" action="{{route('logout')}}" method="POST">
                            {{ csrf_field() }}
                            <button type="submit"
                                class="bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50">log
                                out</button>
                        </form>
                        @else
                        <a href="{{route('login')}}"
                            class="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">Sign
                            in</a>
                        <a href="{{route('register')}}"
                            class="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50">Sign
                            up</a>
                        @endcan
                    </div>
                </div>
                <div class="-mr-2 flex items-center sm:hidden">
                    <x-shared.header.menu-button />
                </div>
            </div>
        </div>

        <div class="sm:hidden" id="mobile-menu">
            <div class="pt-2 pb-3 space-y-1">
                <x-shared.header.navbar />
            </div>
        </div>
    </nav>
</header>
