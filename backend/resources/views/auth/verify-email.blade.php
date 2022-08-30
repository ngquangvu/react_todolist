@extends('layout.html')

@section('meta')
<x-shared.meta title="パスワードを忘れた方">
    {{--
    <meta http-equiv="X-UA-Compatible" content="ie=edge"> --}}
</x-shared.meta>
@endsection

@section('content')
<div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

    <div class="max-w-md w-full space-y-8">
        <div>
            <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow">
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">re-send confirm?</h2>
            <p class="mt-2 text-center text-sm text-gray-600">
                Or
                <a href="{{route('login')}}" class="font-medium text-indigo-600 hover:text-indigo-500"> Sign in to
                    your
                    account
                </a>
            </p>
        </div>
        @if (session('status'))
        <div class="mb-4 font-medium text-sm text-green-600">
            {{ session('status') }}
        </div>
        @endif
        @if ($errors->any())
        <div class="mb-4">
            @foreach ($errors->all() as $error)
            <div class="mb-1 font-medium text-sm text-red-600">
                {{ $error }}
            </div>
            @endforeach
        </div>
        @endif
        <form class="mt-8 space-y-6" action="{{route('verification.send')}}" method="POST">
            {{ csrf_field() }}
            <div>
                <button type="submit"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                        <!-- Heroicon name: solid/lock-closed -->
                        <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clip-rule="evenodd" />
                        </svg>
                    </span>
                    Submit
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
