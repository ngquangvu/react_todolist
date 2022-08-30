<a href="{{$href}}"
    class="block pl-3 pr-4 py-2 border-l-4 text-base sm:inline-flex sm:border-l-0 sm:items-center sm:px-1 sm:pt-1 sm:pb-0 sm:border-b-2 sm:text-sm font-medium {{ $isActive() ? 'bg-indigo-50 text-indigo-700 border-indigo-500 sm:bg-transparent sm:text-gray-900' :  'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 sm:hover:border-gray-300 sm:hover:text-gray-700'}}">
    {{$slot}}
</a>
