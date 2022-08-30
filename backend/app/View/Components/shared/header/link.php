<?php

namespace App\View\Components\shared\header;

use Illuminate\View\Component;
use Illuminate\Support\Facades\Route;

class link extends Component
{
    public $name;
    public $href;

    /**
     * Create a new component instance.
     *
     * @param  string  $name
     * @param  boolean  $active
     * @return void
     */
    public function __construct($name)
    {
        $this->href = route($name);
        $this->name = $name;
    }

    public function isActive()
    {
        return Route::currentRouteName() === $this->name;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.shared.header.link');
    }
}
